import crypto from 'crypto'

/**
 * Admin session tokens — HMAC-signed, expiring.
 *
 * Replaces a `cookieHeader.includes('admin_session=')` presence check that was
 * live on production: `Cookie: admin_session=anything` returned 200 and the full
 * guest inquiry list (names, emails, message bodies). No credential required.
 *
 * The old token was `base64(email:timestamp)` — encoding, not signing — so even
 * a value check would have been forgeable by anyone who could run `base64`.
 *
 * Format: base64url(payload) + "." + base64url(hmac_sha256(payload))
 * where payload is `${email}:${issuedAtMs}`.
 */

const MAX_AGE_MS = 24 * 60 * 60 * 1000 // 24h, matches the cookie's Max-Age
export const SESSION_COOKIE = 'admin_session'

function secret() {
  // Reuse ADMIN_PASSWORD as the signing key so no new secret has to be
  // provisioned. Rotating the admin password therefore invalidates live
  // sessions, which is the desired behaviour.
  const s = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || ''
  return s.replace(/^"|"$/g, '')
}

const b64url = (buf) => Buffer.from(buf).toString('base64url')

export function createSessionToken(email) {
  const key = secret()
  if (!key) throw new Error('No signing key available')
  const payload = `${email}:${Date.now()}`
  const sig = crypto.createHmac('sha256', key).update(payload).digest()
  return `${b64url(payload)}.${b64url(sig)}`
}

/** Parse the cookie header without trusting substring position. */
function readCookie(cookieHeader, name) {
  for (const part of String(cookieHeader || '').split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    if (part.slice(0, idx).trim() === name) return part.slice(idx + 1).trim()
  }
  return null
}

/**
 * True only for a token this server signed, that has not expired.
 * Signature comparison is constant-time.
 */
export function isAuthenticated(req) {
  const key = secret()
  if (!key) return false // fail closed when unconfigured

  const token = readCookie(req?.headers?.cookie, SESSION_COOKIE)
  if (!token) return false

  const dot = token.lastIndexOf('.')
  if (dot < 1) return false

  const payloadB64 = token.slice(0, dot)
  const sigB64 = token.slice(dot + 1)

  let payload
  let presented
  try {
    payload = Buffer.from(payloadB64, 'base64url').toString('utf8')
    presented = Buffer.from(sigB64, 'base64url')
  } catch {
    return false
  }

  const expected = crypto.createHmac('sha256', key).update(payload).digest()
  if (presented.length !== expected.length) return false
  if (!crypto.timingSafeEqual(presented, expected)) return false

  // Signature is valid — now enforce expiry.
  const issuedAt = Number(payload.slice(payload.lastIndexOf(':') + 1))
  if (!Number.isFinite(issuedAt)) return false
  if (Date.now() - issuedAt > MAX_AGE_MS) return false

  return true
}

/** Guard helper: returns true when the request was rejected. */
export function rejectUnauthenticated(req, res) {
  if (isAuthenticated(req)) return false
  res.status(401).json({ error: 'Unauthorized' })
  return true
}
