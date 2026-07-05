export default function handler(req, res) {
  const sessionCookie = req.headers.cookie?.split('; ').find(c => c.startsWith('admin_session='));
  
  if (!sessionCookie) {
    return res.status(401).json({ authenticated: false });
  }

  res.status(200).json({ authenticated: true });
}
