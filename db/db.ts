// import { drizzle } from 'drizzle-orm/postgres-js';
// import { Pool } from 'pg';
// import * as schema from './schema'; // Import your schema

// export const connectDatabase = () => {
//   const connectionString = process.env.DATABASE_URL;

//   if (!connectionString) {
//     throw new Error('DATABASE_URL environment variable is not set');
//   }

//   const pool = new Pool({
//     connectionString,
//     ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
//   });

//   return drizzle(pool, { schema });
// };

// export const db = connectDatabase();

// import { env } from '@/env';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// const queryClient = postgres(env.DATABASE_URL);
// const db = drizzle({ client: queryClient , schema})

import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

// Prevent multiple database connections in Next.js hot reloading

const globalForDb = global as unknown as { conn?: ReturnType<typeof postgres> };

const createDatabaseClient = () => {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const queryClient = globalForDb.conn ?? postgres(env.DATABASE_URL, { 
  
    max: 1,

  });


  if (process.env.NODE_ENV !== 'production') globalForDb.conn = queryClient;

  return drizzle(queryClient, { schema });
};

export const db = createDatabaseClient();