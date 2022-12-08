import { Pool } from "pg";
import { PgConnector } from "drizzle-orm-pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

const connector = new PgConnector(pool);

export { connector };
