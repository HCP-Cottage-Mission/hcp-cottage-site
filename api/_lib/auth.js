export function checkAdminAuth(req) {
  // Check for session cookie (set by /api/auth/login)
  const cookies = req.headers.cookie || '';
  const sessionCookie = cookies
    .split('; ')
    .find(c => c.startsWith('admin_session='));

  return !!sessionCookie;
}

export function sendUnauthorized(res) {
  return res.status(401).json({ error: 'Unauthorized' });
}
