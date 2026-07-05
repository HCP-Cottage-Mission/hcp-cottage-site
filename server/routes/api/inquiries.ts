import { pool } from '~/server/utils/db'

function checkAuth(event: any) {
  const cookie = getCookie(event, 'admin_session')
  return !!cookie
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    if (!checkAuth(event)) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        `SELECT * FROM guest_inquiries
         WHERE status IN ('pending', 'draft_ready')
         ORDER BY received_at DESC`
      )
      return { inquiries: result.rows }
    } catch (err: any) {
      console.error('Database error:', err)
      throw createError({ statusCode: 500, statusMessage: 'Failed to fetch inquiries', data: err.message })
    } finally {
      client.release()
    }
  }

  if (event.node.req.method === 'POST') {
    const { guest_email, guest_name, subject, body, ai_draft, n8n_execution_id } = await readBody(event)

    if (!guest_email || !subject || !body) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields: guest_email, subject, body' })
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        `INSERT INTO guest_inquiries (guest_email, guest_name, subject, body, ai_draft, ai_draft_generated_at, status, n8n_execution_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [guest_email, guest_name || null, subject, body, ai_draft || null, ai_draft ? new Date().toISOString() : null, 'draft_ready', n8n_execution_id || null]
      )
      return { inquiry: result.rows[0] }
    } catch (err: any) {
      console.error('Database error:', err)
      throw createError({ statusCode: 500, statusMessage: 'Failed to create inquiry', data: err.message })
    } finally {
      client.release()
    }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})