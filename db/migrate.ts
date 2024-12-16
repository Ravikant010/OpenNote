import "dotenv/config"
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from "./db";
 async function  migrateDB() {
    
 
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" })
}

migrateDB()