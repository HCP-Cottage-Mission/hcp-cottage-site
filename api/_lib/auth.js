export function checkAdminAuth(request) {
  const cookieHeader = request.headers.get('cookie');

  if (!cookieHeader) {
    console.log('[AUTH] No cookie header present');
    return false;
  }

  const hasSession = cookieHeader.includes('admin_session=');
  console.log('[AUTH] Has session:', hasSession);

  return hasSession;
}
