import { Document, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;
const client = new MongoClient(DB_URL);

const init = async () => {
  try {
    await client.connect();
    console.log("Connection to MongoDB created successfully");
  } catch (error) {
    console.log(error);
  }
};

const getConnection = async <E extends Document>(table: string) => {
  const connection = await client.connect();
  return connection.db().collection<E>(table);
};

export { init, getConnection };
