export default async function handler(req, res) {
  try {
    const response = await fetch('http://hcpcottage-db.krh-cpw-mhm.cloud:8000/rest/v1/guest_inquiries?limit=1', {
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`
      }
    });
    
    const data = await response.json();
    res.json({
      status: 'success',
      http_status: response.status,
      data: data
    });
  } catch (err) {
    res.status(500).json({
      error: 'Kong connection failed',
      message: err.message
    });
  }
}
