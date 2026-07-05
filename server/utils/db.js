import pg from 'pg'
const { Pool } = pg

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable. Expected format: postgresql://user:password@72.61.75.78:5420/dbname (dev) or :5421/dbname (prod)')
}

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: false,
})
