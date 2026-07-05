export default async function handler(req, res) {
  try {
    // Test 1: Check environment
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return res.status(500).json({ error: 'DATABASE_URL not set' });
    }

    // Test 2: Try to import pool
    let pool;
    try {
      const { pool: importedPool } = await import('./_lib/db.js');
      pool = importedPool;
    } catch (importErr) {
      return res.status(500).json({
        error: 'Failed to import pool',
        message: importErr.message
      });
    }

    // Test 3: Try to get a connection
    let client;
    try {
      client = await pool.connect();
    } catch (connectErr) {
      return res.status(500).json({
        error: 'Failed to connect to database',
        message: connectErr.message,
        code: connectErr.code
      });
    }

    // Test 4: Try a simple query
    try {
      const result = await client.query('SELECT 1 as test');
      res.json({
        status: 'success',
        database: 'connected',
        query_result: result.rows[0]
      });
    } catch (queryErr) {
      res.status(500).json({
        error: 'Query failed',
        message: queryErr.message
      });
    } finally {
      if (client) client.release();
    }
  } catch (err) {
    res.status(500).json({
      error: 'Unexpected error',
      message: err.message
    });
  }
}
