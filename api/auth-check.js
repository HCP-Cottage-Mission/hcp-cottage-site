export function GET(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const hasSession = cookieHeader.includes('admin_session=');

  if (!hasSession) {
    return new Response(
      JSON.stringify({ authenticated: false }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ authenticated: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
