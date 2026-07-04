// Kong PostgREST HTTP API for database access (verified working pattern)
// Vercel → Kong HTTP API (port 443 HTTPS, reachable) → PostgreSQL (internal)
// NOT direct PostgreSQL TCP (custom ports blocked by firewall)

const KONG_URL = 'https://hcpcottage-db.krh-cpw-mhm.cloud/rest/v1';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_KEY environment variable for Kong HTTP API');
}

export async function queryTable(tableName, options = {}) {
  const url = new URL(`${KONG_URL}/${tableName}`);

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, `eq.${value}`);
      }
    });
  }

  if (options.order) {
    url.searchParams.append('order', options.order);
  }

  if (options.limit) {
    url.searchParams.append('limit', options.limit);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Kong API error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function insertTable(tableName, data) {
  const response = await fetch(`${KONG_URL}/${tableName}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Kong API error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  return Array.isArray(result) ? result[0] : result;
}

export async function updateTable(tableName, id, data) {
  const response = await fetch(`${KONG_URL}/${tableName}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Kong API error: ${response.status} - ${error}`);
  }

  return response.json();
}
