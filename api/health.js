export default async function handler(req, res) {
  try {
    // Test Supabase connectivity
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;

    let supabaseTest = { status: 'not tested' };

    if (supabaseUrl && serviceKey) {
      try {
        // Convert HTTP to HTTPS for Traefik
        const testUrl = supabaseUrl.replace('http://', 'https://') + '/rest/v1/guest_inquiries?limit=1';
        const testRes = await fetch(testUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${serviceKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        const body = await testRes.text();

        supabaseTest = {
          status: testRes.ok ? 'connected' : 'failed',
          statusCode: testRes.status,
          bodyPreview: body.substring(0, 100)
        };
      } catch (err) {
        supabaseTest = {
          status: 'connection_error',
          error: err.message,
          type: err.constructor.name
        };
      }
    }

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      supabaseUrl: supabaseUrl || 'NOT SET',
      hasServiceKey: !!serviceKey,
      supabaseTest,
      nodeEnv: process.env.NODE_ENV,
      region: req.headers['x-vercel-region'] || 'unknown'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message
    });
  }
}
