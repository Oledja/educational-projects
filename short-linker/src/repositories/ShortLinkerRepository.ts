import ShortLinkerResponse from "../interfaces/ShortLinkerResponse";
import { INSERT, SELECT } from "../utils/Queries";
import * as dotenv from "dotenv";
import { pool } from "../db/connection";

dotenv.config();

class ShortLinkerRepository {
  private connection = pool;

  save = async (shortLink: string, url: string) => {
    const connection = await this.connection.getConnection();
    connection.query(INSERT, [shortLink, url]);
  };

  getUrlByShortLink = async (
    shortLink: string
  ): Promise<ShortLinkerResponse> => {
    const connection = await this.connection.getConnection();
    const [rows] = await connection.query<ShortLinkerResponse[]>(
      SELECT,
      shortLink
    );
    return rows[0];
  };
}

export default ShortLinkerRepository;
