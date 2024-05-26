import type { Config } from 'drizzle-kit';

/** @type {import('drizzle-kit').Config} */
export default {
  out: './migrations',
  schema: './src/models/Schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  dialect: 'sqlite',
} satisfies Config;
