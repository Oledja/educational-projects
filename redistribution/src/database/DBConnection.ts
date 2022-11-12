import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { Store } from "../entity/store";
import { Counter } from "../entity/counter";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.RDS_HOST,
  port: process.env.RDS_PORT,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  entities: [User, Store, Counter, `${__dirname}/src/entity/*.js`],
});

export { dataSource };
