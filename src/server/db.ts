/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { attachDatabasePool } from "@vercel/functions";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

// Build the connection config safely with type guards
const connectionConfig: ConstructorParameters<typeof Pool>[0] = {
  host: process.env.PGHOST ?? undefined,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  user: process.env.PGUSER ?? undefined,
  database: process.env.PGDATABASE ?? undefined,
  ssl:
    process.env.PGSSLMODE && process.env.PGSSLMODE !== "disable"
      ? { rejectUnauthorized: false } // Aurora requires SSL, Vercel sets this correctly
      : false,
  max: 10,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 30000,
};

// Type-safe pool creation
const pool = new Pool(connectionConfig);

// Optional but nice for Vercel observability
attachDatabasePool(pool);

// Type-safe adapter creation
const adapter = new PrismaPg(pool);

// Type-safe PrismaClient with the pg adapter
const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development"
    ? ["query", "info", "warn", "error"]
    : ["error"],
});

// Singleton pattern — safe because we know prisma is properly typed
export const db = globalForPrisma.prisma ?? prisma;

// Only store in global in development to allow HMR
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
