import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma"; // or "@prisma/client" if standard
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { attachDatabasePool } from "@vercel/functions";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use Vercel Aurora integration in production/preview (PGHOST etc. exist)
// Fall back to standard DATABASE_URL in local development
const isVercelPostgres =
  !!process.env.PGHOST && !!process.env.PGUSER && !!process.env.PGDATABASE;

let prisma: PrismaClient;

if (isVercelPostgres) {
  // Production/Preview: Use pg adapter with Vercel's Aurora env vars
  const connectionConfig = {
    host: process.env.PGHOST,
    port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    ssl:
      process.env.PGSSLMODE && process.env.PGSSLMODE !== "disable"
        ? { rejectUnauthorized: false }
        : false,
    max: 10,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 30000,
  };

  const pool = new Pool(connectionConfig);
  attachDatabasePool(pool);

  const adapter = new PrismaPg(pool);

  prisma = new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
} else {
  // Local development: Use standard DATABASE_URL (your local Postgres)
  prisma = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

// Singleton pattern
export const db = globalForPrisma.prisma ?? prisma;

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
