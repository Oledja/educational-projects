import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { Store } from "../entity/store";
import "reflect-metadata";
import { Counter } from "../entity/counter";

dotenv.config();

export const connectDB = new DataSource({
  // type: "postgres",
  // host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  // entities: [User, Store, __dirname + "/src/entity/*.js"],
  // synchronize: true,

  type: "postgres",
  host: "database-1.clo4e6qnkqsu.us-east-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "myPostgreSQL",
  entities: [User, Store, Counter, `${__dirname}/src/entity/*.js`],
  synchronize: true,
});

export default connectDB;
