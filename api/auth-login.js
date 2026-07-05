export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: 'Email and password required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return new Response(
      JSON.stringify({ error: 'Invalid email or password' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Logged in successfully',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `admin_session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`,
      },
    }
  );
}
