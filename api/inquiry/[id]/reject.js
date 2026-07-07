import { pool } from '../../../server/utils/db.js'

function checkAuth(req) {
  const cookieHeader = req.headers.cookie || ''
  return cookieHeader.includes('admin_session=')
}

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

  const client = await pool.connect()
  try {
    // Update inquiry status to rejected
    const result = await client.query(
      `UPDATE guest_inquiries
       SET status = 'rejected'
       WHERE id = $1
       RETURNING *`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }

    console.log(`✅ Inquiry ${id} rejected`)

    return res.status(200).json({
      success: true,
      message: 'Inquiry rejected',
      inquiry: result.rows[0],
    })
  } catch (err) {
    console.error('❌ Error rejecting inquiry:', err.message)
    return res.status(500).json({
      error: 'Failed to reject inquiry',
      message: err.message,
    })
  } finally {
    client.release()
  }
}
