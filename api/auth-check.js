module.exports = function handler(req, res) {
  const allCookies = req.headers.cookie || '';
  const hasSession = allCookies.includes('admin_session=');

  // Return 401 if no valid session, 200 if session exists
  if (!hasSession) {
    return res.status(401).json({ authenticated: false, cookies: allCookies });
  }

  return res.status(200).json({ authenticated: true });
}
