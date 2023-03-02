import { INSERT, SELECT } from "../utils/Queries";
import * as dotenv from "dotenv";
import { pool } from "../db/connection";
import LinkResponse from "../interfaces/LinkResponse";

dotenv.config();

class LinkRepository {
  private connection = pool;

  save = async (shortLink: string, url: string) => {
    const connection = await this.connection.getConnection();
    connection.query(INSERT, [shortLink, url]);
  };

  getUrlByLink = async (shortLink: string): Promise<LinkResponse> => {
    const connection = await this.connection.getConnection();
    const [rows] = await connection.query<LinkResponse[]>(SELECT, shortLink);
    return rows[0];
  };
}

export default LinkRepository;
