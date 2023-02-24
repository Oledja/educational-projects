import axios from "axios";
import * as dotenv from "dotenv";
import CoinMarketCapRawResponse from "../interfices/CoinMarketCapRawResponse";
import getErrorMessage from "../utils/getErrorMessage";

dotenv.config();

class CoinMarketCapClient {
  private API_KEY = process.env.COIN_MARKET_CAP_API_KEY;

  private API_URL = process.env.COIN_MARKET_CAP_URL;

  getCoinMarketCapRates = async (): Promise<CoinMarketCapRawResponse> => {
    try {
      const { data: response } = await axios.get<CoinMarketCapRawResponse>(
        this.API_URL,
        {
          headers: {
            "X-CMC_PRO_API_KEY": this.API_KEY,
          },
        }
      );
      return response;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default CoinMarketCapClient;
