import { pool } from '../server/utils/db.js'

function checkAuth(req) {
  const cookieHeader = req.headers.cookie || ''
  return cookieHeader.includes('admin_session=')
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Inquiry ID required' })
  }

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM guest_inquiries WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }

    return res.status(200).json({ inquiry: result.rows[0] })
  } catch (err) {
    console.error('Database error:', err)
    return res.status(500).json({
      error: 'Failed to fetch inquiry',
      message: err.message,
    })
  } finally {
    client.release()
  }
}
