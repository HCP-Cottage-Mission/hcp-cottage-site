export default function handler(req, res) {
  // Check if admin_session cookie exists
  const cookies = req.headers.cookie || '';
  const sessionCookie = cookies.split('; ').find(c => c.startsWith('admin_session='));

  if (!sessionCookie) {
    return res.status(401).json({ authenticated: false });
  }

  res.status(200).json({ authenticated: true });
}
