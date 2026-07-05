const { pool } = require('./_lib/db.js');
const { checkAdminAuth, sendUnauthorized } = require('./_lib/auth.js');

module.exports = async function handler(req, res) {
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

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM guest_inquiries
       WHERE status IN ('pending', 'draft_ready')
       ORDER BY received_at DESC`
    );
    res.json({ inquiries: result.rows });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Failed to fetch inquiries', message: err.message });
  } finally {
    client.release();
  }
}

async function handlePost(req, res) {
  const { guest_email, guest_name, subject, body, ai_draft, n8n_execution_id } = req.body;

  if (!guest_email || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields: guest_email, subject, body' });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO guest_inquiries (guest_email, guest_name, subject, body, ai_draft, ai_draft_generated_at, status, n8n_execution_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [guest_email, guest_name || null, subject, body, ai_draft || null, ai_draft ? new Date().toISOString() : null, 'draft_ready', n8n_execution_id || null]
    );
    res.json({ inquiry: result.rows[0] });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Failed to create inquiry', message: err.message });
  } finally {
    client.release();
  }
}
