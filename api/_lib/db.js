// Traefik TCP proxy at port 5439 routes to internal PostgreSQL 5432
// Pattern verified working on AAEF and Archovia (both use same tcp routing)
// See: VERIFIED-VERCEL-DATABASE-ACCESS-PATTERN.md

import pg from 'pg';
const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable. Expected: postgresql://postgres:password@72.61.75.78:5439/postgres');
}

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: false, // Traefik TCP proxy is on same VPS, internal/trusted
});
