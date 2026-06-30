import nodemailer from 'nodemailer';

/**
 * POST /api/send-email
 *
 * Sends an email via Hostinger SMTP (ops@hcpcottage.com)
 * Used by n8n workflows for guest confirmations and notifications
 *
 * Request body:
 *   {
 *     to: "guest@example.com",           // recipient email
 *     subject: "Booking Confirmation",   // email subject
 *     html: "<p>Your booking...</p>",    // HTML body
 *     text: "Your booking..."            // Plain text body (fallback)
 *   }
 *
 * Response:
 *   Success: { success: true, messageId: "...", to: "..." }
 *   Error: { success: false, error: "..." }
 */

// Create Nodemailer transporter with Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { to, subject, html, text } = req.body;

  // Validate required fields
  if (!to || !subject || (!html && !text)) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: to, subject, and either html or text',
    });
  }

  try {
    // Verify SMTP credentials are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP environment variables not configured');
      return res.status(500).json({
        success: false,
        error: 'Email service not configured',
      });
    }

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER || 'ops@hcpcottage.com',
      to,
      subject,
      html: html || null,
      text: text || null,
    });

    console.log('Email sent successfully:', {
      to,
      subject,
      messageId: info.messageId,
      response: info.response,
    });

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
      to,
      subject,
    });
  } catch (error) {
    console.error('Email send error:', {
      error: error.message,
      to,
      subject,
      code: error.code,
    });

    return res.status(500).json({
      success: false,
      error: `Failed to send email: ${error.message}`,
    });
  }
}
