// Traefik TCP proxy routes to internal PostgreSQL 5432
// Port allocation per PORT_REGISTRY.md:
//   Dev (5420): postgresql://user:pass@72.61.75.78:5420/hcpcottage_dev
//   Prod (5421): postgresql://user:pass@72.61.75.78:5421/hcpcottage
// Pattern: Traefik TCP routing (no Kong HTTP) per CLAUDE.md policy
// See: VERIFIED-VERCEL-DATABASE-ACCESS-PATTERN.md

import pg from 'pg';
const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable. Expected format: postgresql://user:password@72.61.75.78:5420/dbname (dev) or :5421/dbname (prod)');
}

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: false, // Traefik TCP proxy is on same VPS, internal/trusted
});
// Redeploy trigger: Sat Jul  4 21:22:59 EDT 2026
// Redeploy trigger: Sat Jul  4 21:23:17 EDT 2026
