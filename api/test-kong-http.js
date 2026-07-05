export default async function handler(req, res) {
  try {
    const kongUrl = 'https://hcpcottage-db.krh-cpw-mhm.cloud/rest/v1';
    const key = process.env.SUPABASE_SERVICE_KEY;

    if (!key) {
      return res.status(500).json({ error: 'SUPABASE_SERVICE_KEY not set' });
    }

    // Test 1: Check we can reach Kong via HTTPS
    console.log(`Testing Kong at ${kongUrl}...`);
    const healthRes = await fetch(`${kongUrl}/guest_inquiries?limit=1`, {
      headers: {
        'Authorization': `Bearer ${key}`,
      },
    });

    if (!healthRes.ok) {
      return res.status(500).json({
        error: 'Kong request failed',
        status: healthRes.status,
        message: await healthRes.text(),
      });
    }

    const data = await healthRes.json();

    res.json({
      status: 'success',
      message: 'Connected via Kong HTTP API',
      host: 'hcpcottage-db.krh-cpw-mhm.cloud',
      port: 443,
      protocol: 'HTTPS',
      gateway: 'Kong PostgREST',
      inquiries_count: data.length,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Test failed',
      message: err.message,
    });
  }
}
