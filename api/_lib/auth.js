function getAdminToken() {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    throw new Error('Missing ADMIN_TOKEN environment variable');
  }
  return token;
}

export function checkAdminAuth(req) {
  const adminToken = getAdminToken();
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  return token === adminToken;
}

export function sendUnauthorized(res) {
  return res.status(401).json({ error: 'Unauthorized' });
}
