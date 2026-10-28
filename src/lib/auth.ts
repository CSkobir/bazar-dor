import { betterAuth } from 'better-auth';
import { memoryAdapter, type MemoryDB } from 'better-auth/adapters/memory';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import fs from 'fs';
import path from 'path';

// Check if a cloud or explicit MongoDB URI is provided
const isCloudMongo = Boolean(
  process.env.MONGODB_URI &&
    (process.env.MONGODB_URI.startsWith('mongodb+srv://') ||
      process.env.USE_MONGODB === 'true')
);

type DbRecord = Record<string, unknown>;
type TMemDb = {
  user: DbRecord[];
  session: DbRecord[];
  account: DbRecord[];
  verification: DbRecord[];
  [key: string]: DbRecord[];
};

declare global {
  var __bazar_auth_db: TMemDb | undefined;
}

function toDate(val: unknown): Date {
  if (val instanceof Date) return val;
  if (typeof val === 'string' || typeof val === 'number') {
    const d = new Date(val);
    if (!isNaN(d.getTime())) return d;
  }
  return new Date();
}

function parseRecord(rec: Record<string, unknown>): Record<string, unknown> {
  const r = { ...rec };
  if ('createdAt' in r) r.createdAt = toDate(r.createdAt);
  if ('updatedAt' in r) r.updatedAt = toDate(r.updatedAt);
  if ('expiresAt' in r) r.expiresAt = toDate(r.expiresAt);
  return r;
}

function getDatabaseAdapter() {
  if (isCloudMongo) {
    try {
      const mongoUri = process.env.MONGODB_URI as string;
      const client = new MongoClient(mongoUri);
      const db = client.db('bazar-dor');
      return mongodbAdapter(db, { client });
    } catch (e) {
      console.warn('Failed to initialize MongoDB adapter, falling back to local memory adapter:', e);
    }
  }

  // Reuse existing global singleton across hot module reloads
  if (globalThis.__bazar_auth_db) {
    return memoryAdapter(globalThis.__bazar_auth_db as unknown as MemoryDB);
  }

  // Persistent in-memory storage for seamless local development
  const DB_FILE = path.join(process.cwd(), '.auth-dev-db.json');
  const defaultDb: TMemDb = { user: [], session: [], account: [], verification: [] };

  let rawDb = defaultDb;
  try {
    if (fs.existsSync(DB_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      rawDb = {
        user: Array.isArray(parsed.user) ? parsed.user.map(parseRecord) : [],
        session: Array.isArray(parsed.session) ? parsed.session.map(parseRecord) : [],
        account: Array.isArray(parsed.account) ? parsed.account.map(parseRecord) : [],
        verification: Array.isArray(parsed.verification) ? parsed.verification.map(parseRecord) : [],
      };
    }
  } catch {
    rawDb = defaultDb;
  }

  globalThis.__bazar_auth_db = rawDb;

  // Auto-save on periodic interval
  if (typeof setInterval !== 'undefined') {
    const timer = setInterval(() => {
      try {
        if (globalThis.__bazar_auth_db) {
          fs.writeFileSync(DB_FILE, JSON.stringify(globalThis.__bazar_auth_db, null, 2), 'utf8');
        }
      } catch {}
    }, 1500);
    if (timer.unref) timer.unref();
  }

  return memoryAdapter(rawDb as unknown as MemoryDB);
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || 'bazar_dor_development_super_secret_key_2026_xyz',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  trustedOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_google_client_secret',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || 'dummy_github_client_id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'dummy_github_client_secret',
    },
  },
  database: getDatabaseAdapter(),
});
