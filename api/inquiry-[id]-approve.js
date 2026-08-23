import { pool } from '../server/utils/db.js'
import fetch from 'node-fetch'
import { isAuthenticated } from './_session.js'

// Verified HMAC session check. This was previously a substring test on the
// cookie header, which accepted `admin_session=anything` -- an unauthenticated
// read of all guest inquiries on production.
const checkAuth = isAuthenticated

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Inquiry ID required' })
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

  let requestData
  try {
    requestData = JSON.parse(body)
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  const { final_response } = requestData

  if (!final_response) {
    return res.status(400).json({ error: 'final_response is required' })
  }

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

    // Send email via /api/send-email endpoint
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const emailResponse = await fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: inquiry.guest_email,
        subject: `Re: ${inquiry.subject}`,
        html: final_response,
        text: final_response.replace(/<[^>]*>/g, ''), // Strip HTML tags for plain text
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('❌ Email send failed:', errorData)
      return res.status(500).json({ error: 'Failed to send email', details: errorData.error })
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
  } catch (err) {
    console.error('❌ Error processing inquiry approval:', err.message)
    return res.status(500).json({
      error: 'Failed to process approval',
      message: err.message,
    })
  } finally {
    client.release()
  }
}
