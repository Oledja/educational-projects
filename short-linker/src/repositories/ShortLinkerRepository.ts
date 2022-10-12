import { createPool } from "mysql2";
import ShortLinkerResponse from "../types/ShortLinkerResponse";
import { INSERT, SELECT } from "../utill/Queries";
import * as dotenv from "dotenv";
dotenv.config();

class ShortLinkerRepository {
  pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  });

  public save(shortLink: string, url: string) {
    this.pool.query(INSERT, [shortLink, url]);
  }

  public async getUrlByShortLink(shortLink: string) {
    const [rows] = await this.pool
      .promise()
      .query<ShortLinkerResponse[]>(SELECT, shortLink);
    return rows;
  }
}

export default ShortLinkerRepository;
