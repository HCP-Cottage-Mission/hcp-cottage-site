import { supabase } from './_lib/db.js';
import { checkAdminAuth, sendUnauthorized } from './_lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'POST') {
    return handlePost(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req, res) {
  if (!checkAdminAuth(req)) {
    return sendUnauthorized(res);
  }

  try {
    const { data, error } = await supabase
      .from('guest_inquiries')
      .select('*')
      .in('status', ['pending', 'draft_ready'])
      .order('received_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        error: error.message,
        code: error.code,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }

    res.json({ inquiries: data });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}

async function handlePost(req, res) {
  // Called by n8n to create a new inquiry after reading email
  const { guest_email, guest_name, subject, body, ai_draft, n8n_execution_id } = req.body;

  if (!guest_email || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields: guest_email, subject, body' });
  }

  const { data, error } = await supabase
    .from('guest_inquiries')
    .insert([
      {
        guest_email,
        guest_name,
        subject,
        body,
        ai_draft: ai_draft || null,
        ai_draft_generated_at: ai_draft ? new Date().toISOString() : null,
        status: 'draft_ready',
        n8n_execution_id,
      },
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ inquiry: data[0] });
}
