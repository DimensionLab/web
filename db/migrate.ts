
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { config } from 'dotenv';

const envArg = process.argv.slice(2)[0];
const envPath = envArg ? envArg.split("=")[1] : '.env.local';
config({ path: envPath });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'db/migrations' });
    console.log('Migration completed');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

main();
