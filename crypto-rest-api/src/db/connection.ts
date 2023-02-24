import { createPool } from "mysql2/promise";
import * as dontenv from "dotenv";

dontenv.config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const pool = createPool({
  host,
  port,
  user,
  password,
  database,
});

export { pool };
