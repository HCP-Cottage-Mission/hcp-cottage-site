import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Parse request body (Vercel doesn't auto-parse)
  let body = ''
  await new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', resolve)
    req.on('error', reject)
  })

  let emailData
  try {
    emailData = JSON.parse(body)
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  const { to, subject, html, text } = emailData

  if (!to || !subject || (!html && !text)) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, and (html or text)' })
  }

  // Get credentials (strip quotes from Vercel env vars)
  const emailUser = (process.env.COTTAGE_EMAIL_USER || '').replace(/^"|"$/g, '')
  const emailPassword = (process.env.COTTAGE_EMAIL_PASSWORD || '').replace(/^"|"$/g, '')

  if (!emailUser || !emailPassword) {
    console.error('❌ Email credentials not configured')
    return res.status(500).json({ error: 'Email credentials not configured' })
  }

  // Create Hostinger SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  })

  try {
    // Send email
    const info = await transporter.sendMail({
      from: 'info@hcpcottage.com',
      to,
      subject,
      html: html || null,
      text: text || null,
    })

    console.log(`✅ Email sent to ${to} (Message ID: ${info.messageId})`)

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    })
  } catch (error) {
    console.error('❌ Email send failed:', error.message)

    return res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    })
  }
}
