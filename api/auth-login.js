import crypto from 'crypto'
import { createSessionToken, SESSION_COOKIE } from './_session.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body = ''
  await new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', resolve)
    req.on('error', reject)
  })
  const { email, password } = JSON.parse(body)

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  const adminEmail = (process.env.ADMIN_EMAIL || '').replace(/^"|"$/g, '')
  const adminPassword = (process.env.ADMIN_PASSWORD || '').replace(/^"|"$/g, '')

  // Constant-time credential comparison, so a wrong password cannot be
  // narrowed down by timing. Both sides are hashed first to equalise length.
  const hash = (s) => crypto.createHash('sha256').update(String(s)).digest()
  const emailOk = crypto.timingSafeEqual(hash(email), hash(adminEmail))
  const passOk = crypto.timingSafeEqual(hash(password), hash(adminPassword))

  if (!adminEmail || !adminPassword || !emailOk || !passOk) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  // HMAC-signed and expiring. Was base64(email:timestamp) — encoding, not
  // signing, so anyone could mint one.
  const sessionToken = createSessionToken(email)

  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
  )

  return res.status(200).json({
    success: true,
    message: 'Logged in successfully',
  })
}
