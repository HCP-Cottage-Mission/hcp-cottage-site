const { createClient } = require('@supabase/supabase-js');

const rawUrl = process.env.VITE_SUPABASE_URL || 'http://hcpcottage-db.krh-cpw-mhm.cloud';
const supabaseUrl = rawUrl.replace('http://', 'https://');
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration: VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY required');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
