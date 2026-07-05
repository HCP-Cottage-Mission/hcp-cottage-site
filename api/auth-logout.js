export default function handler(req, res) {
  // Clear session cookie by setting Max-Age=0
  res.setHeader(
    'Set-Cookie',
    'admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
  );

  return res.status(200).json({ success: true, message: 'Logged out' });
}
