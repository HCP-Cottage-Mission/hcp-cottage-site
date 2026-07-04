import { supabase } from '../../_lib/db.js';
import { checkAdminAuth, sendUnauthorized } from '../../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handlePost(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}

async function handlePost(req, res) {
  if (!checkAdminAuth(req)) {
    return sendUnauthorized(res);
  }

  const { id } = req.query;
  const { final_response } = req.body;

  if (!id || !final_response) {
    return res.status(400).json({ error: 'Missing id or final_response' });
  }

  // Get the inquiry to send the response
  const { data: inquiry, error: fetchError } = await supabase
    .from('guest_inquiries')
    .select('guest_email, subject')
    .eq('id', id)
    .single();

  if (fetchError) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  // Send the email response
  const emailRes = await fetch(new URL('/api/send-email', process.env.VERCEL_URL || 'http://localhost:3000'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: inquiry.guest_email,
      subject: `Re: ${inquiry.subject}`,
      html: final_response,
    }),
  });

  if (!emailRes.ok) {
    return res.status(500).json({ error: 'Failed to send email' });
  }

  // Update inquiry status
  const { error: updateError } = await supabase
    .from('guest_inquiries')
    .update({
      status: 'sent',
      final_response,
      sent_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  res.json({ success: true, message: 'Response sent to guest' });
}
