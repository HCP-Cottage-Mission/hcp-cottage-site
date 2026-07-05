export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || ''
  const hasSession = cookieHeader.includes('admin_session=')

  if (!hasSession) {
    return res.status(401).json({ authenticated: false })
  }

  return res.status(200).json({ authenticated: true })
}
