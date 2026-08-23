import { pool } from '../server/utils/db.js'
import { isAuthenticated } from './_session.js'

// Verified HMAC session check. This was previously a substring test on the
// cookie header, which accepted `admin_session=anything` -- an unauthenticated
// read of all guest inquiries on production.
const checkAuth = isAuthenticated

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (!checkAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        `SELECT * FROM guest_inquiries
         WHERE status IN ('pending', 'draft_ready')
         ORDER BY received_at DESC`
      )
      return res.json({ inquiries: result.rows })
    } catch (err) {
      console.error('Database error:', err)
      return res.status(500).json({ error: 'Failed to fetch inquiries', message: err.message })
    } finally {
      client.release()
    }
  }

  if (req.method === 'POST') {
    let requestBody = ''
    await new Promise((resolve, reject) => {
      req.on('data', (chunk) => {
        requestBody += chunk.toString()
      })
      req.on('end', resolve)
      req.on('error', reject)
    })
    const { guest_email, guest_name, subject, body, ai_draft, n8n_execution_id } = JSON.parse(requestBody)

    if (!guest_email || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields: guest_email, subject, body' })
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        `INSERT INTO guest_inquiries (guest_email, guest_name, subject, body, ai_draft, ai_draft_generated_at, status, n8n_execution_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [guest_email, guest_name || null, subject, body, ai_draft || null, ai_draft ? new Date().toISOString() : null, 'draft_ready', n8n_execution_id || null]
      )
      return res.json({ inquiry: result.rows[0] })
    } catch (err) {
      console.error('Database error:', err)
      return res.status(500).json({ error: 'Failed to create inquiry', message: err.message })
    } finally {
      client.release()
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
