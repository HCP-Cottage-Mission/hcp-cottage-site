import { queryTable, insertTable, updateTable } from './_lib/db.js';
import { checkAdminAuth, sendUnauthorized } from './_lib/auth.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return await handleGet(req, res);
    }

    if (req.method === 'POST') {
      return await handlePost(req, res);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}

async function handleGet(req, res) {
  if (!checkAdminAuth(req)) {
    return sendUnauthorized(res);
  }

  try {
    const inquiries = await queryTable('guest_inquiries', {
      filters: undefined,
      order: 'received_at.desc',
      limit: 100
    });
    res.json({ inquiries });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({
      error: 'Failed to fetch inquiries',
      message: err.message
    });
  }
}

async function handlePost(req, res) {
  const { guest_email, guest_name, subject, body, ai_draft, n8n_execution_id } = req.body;

  if (!guest_email || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields: guest_email, subject, body' });
  }

  try {
    const inquiry = await insertTable('guest_inquiries', {
      guest_email,
      guest_name: guest_name || null,
      subject,
      body,
      ai_draft: ai_draft || null,
      ai_draft_generated_at: ai_draft ? new Date().toISOString() : null,
      status: 'draft_ready',
      n8n_execution_id: n8n_execution_id || null
    });
    res.json({ inquiry });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({
      error: 'Failed to create inquiry',
      message: err.message
    });
  }
}
