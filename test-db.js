const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://hcpcottage-db.krh-cpw-mhm.cloud';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? 'present' : 'missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase config');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

supabase
  .from('guest_inquiries')
  .select('*')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Success! Data:', data);
    }
    process.exit(error ? 1 : 0);
  });
