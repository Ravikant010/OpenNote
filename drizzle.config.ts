"use server"
import { Config, defineConfig } from "drizzle-kit";
import { env } from "./env";
export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: './db/schema.ts',

  dbCredentials: {
    url: env.DATABASE_URL as string,

   
  },

}) satisfies Config