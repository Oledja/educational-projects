import axios from "axios";
import PrivatebankResponse from "../interfaces/PrivatbankResponse";
import PrivatbankRawResponse from "../interfaces/PrivatbankRawResponse";
import * as dotenv from "dotenv";
import PrivatCurrencyCode from "../enums/PrivatCurrencyCode";
dotenv.config();

class PrivatbankClient {
  private PRIVATBANK_URL = process.env.PRIVATBANK_URL;
  async getCurrentExchangeRate(): Promise<PrivatebankResponse[]> {
    const { data: privatResponse } = await axios.get<PrivatbankRawResponse[]>(
      this.PRIVATBANK_URL
    );
    return privatResponse.filter((value) => {
      const { ccy } = value;
      if (ccy === PrivatCurrencyCode.USD || ccy === PrivatCurrencyCode.EUR)
        return true;
    });
  }
}

export default PrivatbankClient;
