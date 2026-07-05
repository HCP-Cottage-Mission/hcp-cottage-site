import pkg from 'pg';
const { Pool } = pkg;

// Test both dev and prod connections
const configs = [
  {
    name: 'Development (5420)',
    connectionString: 'postgresql://postgres:hcpcottage_dev_pass@72.61.75.78:5420/hcpcottage_dev'
  },
  {
    name: 'Production (5421)',
    connectionString: 'postgresql://postgres:hcpcottage_dev_pass@72.61.75.78:5421/hcpcottage'
  }
];

async function testConnection(config) {
  const pool = new Pool({ connectionString: config.connectionString, ssl: false });
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    console.log(`✅ ${config.name}: Connected successfully`);
    console.log(`   Current DB time: ${result.rows[0].current_time}`);
    return true;
  } catch (err) {
    console.log(`❌ ${config.name}: Connection failed`);
    console.log(`   Error: ${err.message}`);
    return false;
  } finally {
    await pool.end();
  }
}

async function runTests() {
  console.log('Testing database connections...\n');
  let passed = 0;
  for (const config of configs) {
    if (await testConnection(config)) passed++;
  }
  console.log(`\nResult: ${passed}/${configs.length} connections successful`);
  process.exit(passed === configs.length ? 0 : 1);
}

runTests();
