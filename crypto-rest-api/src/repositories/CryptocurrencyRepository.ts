import * as dotenv from "dotenv";
import { formatDate } from "../utill/utill";
import ICryptocurrency from "../@types/ICryptocurrency";

import IRowDataResponse from "../@types/IRowDataResponse";
import { createPool } from "mysql2";
import {
  INSERT,
  SELECT_BY_NAME_AND_TIME,
  SELECT_BY_NAME_AND_TIME_AND_MARKET,
} from "../utill/Queries";

dotenv.config();

class CryptocurrencyRepository {
  pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  });

  public save(currency: ICryptocurrency) {
    this.pool.query(INSERT, [
      currency.symbol,
      currency.name,
      currency.price!,
      currency.market,
      formatDate(new Date()),
    ]);
  }

  public async getCurrenciesBySymbol(
    symbol: string,
    time: Date
  ): Promise<ICryptocurrency[]> {
    const [rows] = await this.pool
      .promise()
      .query<IRowDataResponse[]>(SELECT_BY_NAME_AND_TIME, [symbol, time]);
    return rows;
  }

  async getAveragePriceBySymbolAndMarketAndTime(
    symbol: string,
    market: string,
    time: Date
  ): Promise<ICryptocurrency[]> {
    const [rows] = await this.pool
      .promise()
      .query<IRowDataResponse[]>(SELECT_BY_NAME_AND_TIME_AND_MARKET, [
        symbol,
        formatDate(time),
        market,
      ]);
    return rows;
  }
}

export default CryptocurrencyRepository;
