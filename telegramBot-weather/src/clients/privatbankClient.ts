import axios from "axios";
import IPrivatebankResponse from "../interfaces/IPrivatbankResponse";
import * as dotenv from "dotenv";
dotenv.config();

class PrivatbankClient {
  async getCurrentExchangeRate(): Promise<IPrivatebankResponse[]> {
    const { data: privatResult } = await axios.get(process.env.PRIVATBANK_URL);
    return privatResult.filter(
      (value: { ccy: string }) => value.ccy === "USD" || value.ccy === "EUR"
    );
  }
}

export default PrivatbankClient;
