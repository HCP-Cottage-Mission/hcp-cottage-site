// Kong PostgREST HTTP API instead of direct PostgreSQL
// Kong is accessible via HTTPS on port 443, which Vercel CAN reach

const KONG_URL = 'https://hcpcottage-db.krh-cpw-mhm.cloud/rest/v1';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
}

export async function query(sql, params = []) {
  // This is a simplified shim - Kong's PostgREST doesn't support arbitrary SQL
  // Instead, we'll use specific HTTP endpoints for our use cases
  throw new Error('Kong API uses HTTP endpoints, not raw SQL. Use queryTable() or specific methods instead.');
}

export async function queryTable(tableName, options = {}) {
  const url = new URL(`${KONG_URL}/${tableName}`);

  // Add filters from options.filter
  if (options.filter) {
    Object.entries(options.filter).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, `eq.${value}`);
      }
    });
  }

  // Add ordering
  if (options.order) {
    url.searchParams.append('order', options.order);
  }

  // Add limit
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
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Kong API error: ${response.status} - ${error}`);
  }

  return response.json();
}
