import { env } from "~/env";
import { PrismaClient } from "@prisma/client"; // or your generated path
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { attachDatabasePool } from "@vercel/functions";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

// Only use Vercel Aurora integration (pg adapter) when actually running on Vercel
const isVercelEnvironment = process.env.VERCEL === "1";

let prisma: PrismaClient;

if (
  isVercelEnvironment &&
  process.env.PGHOST &&
  process.env.PGUSER &&
  process.env.PGDATABASE
) {
  // Production/Preview on Vercel: Use pg adapter with injected PG* vars (IAM auth)
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
  // Local development (or non-Vercel): Use standard DATABASE_URL + local Postgres
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
