import axios from "axios";
import MonobankResponse from "../interfaces/MonobankResponse";
import * as dotenv from "dotenv";
import MonobankRawResponse from "../interfaces/MonobankRawResponse";
dotenv.config();

class MonobankClient {
  private MONOBANK_URL = process.env.MONOBANK_URL;
  public async getCurrentExchangeRate(): Promise<MonobankResponse[]> {
    const { data: monoResponse } = await axios.get<MonobankRawResponse[]>(
      this.MONOBANK_URL
    );
    return monoResponse.filter((value) => {
      const { currencyCodeB, rateBuy } = value;
      if (currencyCodeB === 980 && rateBuy) return true;
    });
  }
}

export default MonobankClient;
