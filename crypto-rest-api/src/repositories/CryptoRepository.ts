import { pool } from "../db/connection";
import { Currency } from "../interfices/currency";
import Crypto from "../interfices/Crypto";
import {
  INSERT,
  SELECT_BY_NAME_AND_TIME,
  SELECT_BY_NAME_AND_TIME_AND_MARKET,
} from "../utils/Queries";

class CryptoRepository {
  private connection = pool;

  getBySymbolAndTime = async (
    symbol: string,
    time: Date
  ): Promise<Crypto[]> => {
    const connection = await this.connection.getConnection();
    const result = await connection.query(SELECT_BY_NAME_AND_TIME, [
      symbol,
      time,
    ]);
    return result[0] as Crypto[];
  };

  getBySymbolAndTimeAndMarket = async (
    symbol: string,
    time: Date,
    market: string
  ): Promise<Crypto[]> => {
    const connection = await this.connection.getConnection();

    const result = await connection.query(SELECT_BY_NAME_AND_TIME_AND_MARKET, [
      symbol,
      time,
      market,
    ]);
    return result[0] as Crypto[];
  };

  save = async (crypto: Currency[]) => {
    const connection = await this.connection.getConnection();

    await connection.query(INSERT, [crypto]);
  };
}

export default CryptoRepository;
