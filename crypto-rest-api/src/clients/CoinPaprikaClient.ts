import axios from "axios";
import {
  CoinPaprika,
  CoinPaprikaRawResponse,
} from "../interfices/CoinPaprikaRawResponse";
import getErrorMessage from "../utils/getErrorMessage";
import * as dotenv from "dotenv";

dotenv.config();

class CoinPaprikaClient {
  private API_URL = process.env.COIN_PAPRIKA_URL;

  getCoinPaprikaRates = async (): Promise<CoinPaprikaRawResponse> => {
    try {
      const { data: response } = await axios.get<CoinPaprika[]>(this.API_URL);
      return { data: response };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default CoinPaprikaClient;
