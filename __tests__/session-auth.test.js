import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import crypto from 'crypto'
import { isAuthenticated, createSessionToken, SESSION_COOKIE } from '../api/_session.js'

// Regression tests for a LIVE authentication bypass found 2026-08-23.
//
// The admin routes gated on `cookieHeader.includes('admin_session=')` — a
// substring test, not a value check. Against production:
//
//   Cookie: admin_session=anything  ->  200 + every guest inquiry
//
// The token itself was base64(email:timestamp): encoding, not signing, so even
// a value comparison would have been trivially forgeable.

const req = (cookie) => ({ headers: cookie === undefined ? {} : { cookie } })

describe('admin session verification', () => {
  const OLD = process.env.ADMIN_PASSWORD
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = 'test-signing-key'
    delete process.env.SESSION_SECRET
  })
  afterEach(() => {
    if (OLD === undefined) delete process.env.ADMIN_PASSWORD
    else process.env.ADMIN_PASSWORD = OLD
  })

  it('accepts a token this server signed', () => {
    const token = createSessionToken('admin@example.com')
    expect(isAuthenticated(req(`${SESSION_COOKIE}=${token}`))).toBe(true)
  })

  // THE BUG: this exact request returned 200 on production.
  it('rejects the bare presence of the cookie', () => {
    expect(isAuthenticated(req('admin_session=anything'))).toBe(false)
    expect(isAuthenticated(req('admin_session='))).toBe(false)
    expect(isAuthenticated(req('admin_session=true'))).toBe(false)
  })

  it('rejects the old unsigned base64(email:timestamp) token', () => {
    const legacy = Buffer.from(`admin@example.com:${Date.now()}`).toString('base64')
    expect(isAuthenticated(req(`${SESSION_COOKIE}=${legacy}`))).toBe(false)
  })

  it('rejects a token signed with the wrong key', () => {
    const payload = Buffer.from(`admin@example.com:${Date.now()}`).toString('base64url')
    const sig = crypto.createHmac('sha256', 'wrong-key').update(
      Buffer.from(payload, 'base64url').toString('utf8')
    ).digest().toString('base64url')
    expect(isAuthenticated(req(`${SESSION_COOKIE}=${payload}.${sig}`))).toBe(false)
  })

  it('rejects a tampered payload that keeps a valid-looking signature', () => {
    const token = createSessionToken('admin@example.com')
    const [, sig] = token.split('.')
    const forged = Buffer.from('attacker@evil.com:' + Date.now()).toString('base64url')
    expect(isAuthenticated(req(`${SESSION_COOKIE}=${forged}.${sig}`))).toBe(false)
  })

  it('rejects an expired token even though the signature is valid', () => {
    const stale = `admin@example.com:${Date.now() - 25 * 60 * 60 * 1000}`
    const sig = crypto.createHmac('sha256', 'test-signing-key').update(stale).digest()
    const token = `${Buffer.from(stale).toString('base64url')}.${sig.toString('base64url')}`
    expect(isAuthenticated(req(`${SESSION_COOKIE}=${token}`))).toBe(false)
  })

  it('is not fooled by the cookie name appearing inside another value', () => {
    const token = createSessionToken('admin@example.com')
    // A different cookie whose VALUE contains our cookie name.
    expect(isAuthenticated(req(`other=admin_session=${token}`))).toBe(false)
  })

  it('reads the right cookie when several are present', () => {
    const token = createSessionToken('admin@example.com')
    expect(isAuthenticated(req(`a=1; ${SESSION_COOKIE}=${token}; b=2`))).toBe(true)
  })

  it('rejects when no cookie header is present at all', () => {
    expect(isAuthenticated(req())).toBe(false)
    expect(isAuthenticated(req(''))).toBe(false)
  })

  it('rejects malformed tokens without throwing', () => {
    for (const bad of ['.', 'a.', '.b', 'no-dot', '!!!.???', 'a.b.c.d']) {
      expect(() => isAuthenticated(req(`${SESSION_COOKIE}=${bad}`))).not.toThrow()
      expect(isAuthenticated(req(`${SESSION_COOKIE}=${bad}`))).toBe(false)
    }
  })

  it('fails closed when no signing key is configured', () => {
    const token = createSessionToken('admin@example.com')
    delete process.env.ADMIN_PASSWORD
    delete process.env.SESSION_SECRET
    expect(isAuthenticated(req(`${SESSION_COOKIE}=${token}`))).toBe(false)
  })
})
