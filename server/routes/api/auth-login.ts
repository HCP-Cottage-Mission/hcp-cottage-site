export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  }

  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password required' })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (email !== adminEmail || password !== adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64')

  setCookie(event, 'admin_session', sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 86400,
    path: '/',
  })

  return {
    success: true,
    message: 'Logged in successfully',
  }
})