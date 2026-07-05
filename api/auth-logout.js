export function POST(request) {
  return new Response(
    JSON.stringify({ success: true, message: 'Logged out' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      },
    }
  );
}
