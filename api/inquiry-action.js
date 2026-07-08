import { pool } from '../server/utils/db.js'
import nodemailer from 'nodemailer'

function checkAuth(req) {
  const cookieHeader = req.headers.cookie || ''
  return cookieHeader.includes('admin_session=')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id, action } = req.query

  if (!id || !action) {
    return res.status(400).json({ error: 'Missing required: id, action (approve|reject)' })
  }

  if (!['approve', 'reject'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action. Must be: approve or reject' })
  }

  // Parse request body
  let body = ''
  await new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', resolve)
    req.on('error', reject)
  })

  let requestData = {}
  if (body) {
    try {
      requestData = JSON.parse(body)
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
  }

  const { final_response } = requestData

  const client = await pool.connect()
  try {
    // Fetch the inquiry
    const inquiryResult = await client.query(
      'SELECT * FROM guest_inquiries WHERE id = $1',
      [id]
    )

    if (inquiryResult.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }

    const inquiry = inquiryResult.rows[0]

    // REJECT action
    if (action === 'reject') {
      const result = await client.query(
        `UPDATE guest_inquiries
         SET status = 'rejected'
         WHERE id = $1
         RETURNING *`,
        [id]
      )
      console.log(`✅ Inquiry ${id} rejected`)
      return res.status(200).json({
        success: true,
        message: 'Inquiry rejected',
        inquiry: result.rows[0],
      })
    }

    // APPROVE action (send email)
    if (action === 'approve') {
      if (!final_response) {
        return res.status(400).json({ error: 'final_response required for approve action' })
      }

      // Send email directly via Hostinger SMTP
      const emailUser = (process.env.COTTAGE_EMAIL_USER || '').replace(/^"|"$/g, '')
      const emailPassword = (process.env.COTTAGE_EMAIL_PASSWORD || '').replace(/^"|"$/g, '')

      if (!emailUser || !emailPassword) {
        console.error('❌ Email credentials not configured')
        return res.status(500).json({ error: 'Email credentials not configured' })
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      })

      try {
        const info = await transporter.sendMail({
          from: 'info@hcpcottage.com',
          to: inquiry.guest_email,
          subject: `Re: ${inquiry.subject}`,
          html: final_response,
          text: final_response.replace(/<[^>]*>/g, ''),
        })

        console.log(`✅ Email sent to ${inquiry.guest_email} (Message ID: ${info.messageId})`)
      } catch (emailError) {
        console.error('❌ Email send failed:', emailError.message)
        return res.status(500).json({ error: 'Failed to send email', details: emailError.message })
      }

      // Update inquiry status
      const updateResult = await client.query(
        `UPDATE guest_inquiries
         SET status = 'sent', final_response = $1, sent_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [final_response, id]
      )

      console.log(`✅ Inquiry ${id} approved and email sent to ${inquiry.guest_email}`)

      return res.status(200).json({
        success: true,
        message: 'Response sent to guest',
        inquiry: updateResult.rows[0],
      })
    }
  } catch (err) {
    console.error('❌ Error processing inquiry action:', err.message)
    return res.status(500).json({
      error: 'Failed to process action',
      message: err.message,
    })
  } finally {
    client.release()
  }
}
