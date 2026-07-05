import { pool } from './_lib/db.js';
import { checkAdminAuth } from './_lib/auth.js';

function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

export async function GET(request) {
  if (!checkAdminAuth(request)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM guest_inquiries
       WHERE status IN ('pending', 'draft_ready')
       ORDER BY received_at DESC`
    );
    return jsonResponse({ inquiries: result.rows });
  } catch (err) {
    console.error('Database error:', err);
    return jsonResponse({ error: 'Failed to fetch inquiries', message: err.message }, 500);
  } finally {
    client.release();
  }
}

export async function POST(request) {
  const { guest_email, guest_name, subject, body, ai_draft, n8n_execution_id } = await request.json();

  if (!guest_email || !subject || !body) {
    return jsonResponse({ error: 'Missing required fields: guest_email, subject, body' }, 400);
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO guest_inquiries (guest_email, guest_name, subject, body, ai_draft, ai_draft_generated_at, status, n8n_execution_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [guest_email, guest_name || null, subject, body, ai_draft || null, ai_draft ? new Date().toISOString() : null, 'draft_ready', n8n_execution_id || null]
    );
    return jsonResponse({ inquiry: result.rows[0] });
  } catch (err) {
    console.error('Database error:', err);
    return jsonResponse({ error: 'Failed to create inquiry', message: err.message }, 500);
  } finally {
    client.release();
  }
}
