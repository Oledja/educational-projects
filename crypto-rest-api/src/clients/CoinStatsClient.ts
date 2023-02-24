import axios from "axios";
import getErrorMessage from "../utils/getErrorMessage";
import CoinStatsRawResponse from "../interfices/CoinStatsRawResponse";
import * as dotenv from "dotenv";

dotenv.config();

class CoinStatsClient {
  private API_URL = process.env.COINSTATS_URL;

  getCoinStatsRates = async (): Promise<CoinStatsRawResponse> => {
    try {
      const { data: response } = await axios.get<CoinStatsRawResponse>(
        this.API_URL
      );
      return response;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default CoinStatsClient;
