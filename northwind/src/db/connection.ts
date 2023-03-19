import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const pool = new Pool({
  database,
  host,
  port,
  user,
  password,
});

export { pool };
