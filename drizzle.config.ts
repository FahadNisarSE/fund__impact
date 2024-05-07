import type { Config } from 'drizzle-kit';
import * as dotenv from "dotenv";

dotenv.config();

if (!('DATABASE_CONNECTION' in process.env)) throw new Error('DATABASE_URL not found in environment');

export default {
  schema: './db/schema.ts',
  out: './db/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION!,
  }
} satisfies Config;