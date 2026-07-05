function checkAdminAuth(req) {
  // Check for session cookie - be explicit about what we're checking
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    console.log('[AUTH] No cookie header present');
    return false;
  }

  const hasSession = cookieHeader.includes('admin_session=');
  console.log('[AUTH] Cookie header:', cookieHeader.substring(0, 50), '... Has session:', hasSession);

  return hasSession;
}

function sendUnauthorized(res) {
  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = { checkAdminAuth, sendUnauthorized };
