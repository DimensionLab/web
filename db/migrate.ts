
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { config } from 'dotenv';

const envArg = process.argv.slice(2)[0];
const envPath = envArg ? envArg.split("=")[1] : '.env.local';
config({ path: envPath });

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);
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
