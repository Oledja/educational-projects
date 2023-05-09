import { Pool } from "pg";
import * as dotenv from "dotenv";
import { getDBEnv } from "../utils/envUtils";

dotenv.config();

const port = process.env.DB_PORT;

export const pool = new Pool({
  database: getDBEnv("DB_NAME"),
  host: getDBEnv("DB_HOST"),
  user: getDBEnv("DB_USERNAME"),
  password: getDBEnv("DB_PASSWORD"),
  port,
});
