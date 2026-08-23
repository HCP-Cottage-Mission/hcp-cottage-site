import { isAuthenticated } from './_session.js'

export default function handler(req, res) {
  // Verified HMAC session check. This was previously a substring test on the
  // cookie header, so `admin_session=anything` reported authenticated: true.
  if (!isAuthenticated(req)) {
    return res.status(401).json({ authenticated: false })
  }

  return res.status(200).json({ authenticated: true })
}
