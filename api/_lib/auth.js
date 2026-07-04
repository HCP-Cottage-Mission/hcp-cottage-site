const adminToken = process.env.ADMIN_TOKEN;

if (!adminToken) {
  throw new Error('Missing ADMIN_TOKEN environment variable');
}

function checkAdminAuth(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (token !== adminToken) {
    return false;
  }

  return true;
}

function sendUnauthorized(res) {
  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = { checkAdminAuth, sendUnauthorized };
