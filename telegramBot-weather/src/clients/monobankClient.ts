import axios from "axios";
import MonobankResponse from "../interfaces/IMonobankResponse";
import * as dotenv from "dotenv";
dotenv.config();

class MonobankClient {
  public async getCurrentExchangeRate(): Promise<MonobankResponse[]> {
    const { data: monoResult } = await axios.get(process.env.MONOBANK_URL);
    return monoResult.filter(
      (value: { currencyCodeB: number; rateBuy: number }) =>
        value.currencyCodeB === 980 && value.rateBuy
    );
  }
}

export default MonobankClient;
