import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { Store } from "../entity/store";
import { Counter } from "../entity/counter";
import "reflect-metadata";

dotenv.config();

const type = "postgres";
const host = process.env.RDS_HOST;
const port = process.env.RDS_PORT;
const username = process.env.RDS_USERNAME;
const password = process.env.RDS_PASSWORD;
const database = process.env.RDS_DATABASE;

const dataSource = new DataSource({
  type,
  host,
  port,
  username,
  password,
  database,
  entities: [User, Store, Counter, `${__dirname}/src/entity/*.js`],
});

export { dataSource };
