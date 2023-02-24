import axios from "axios";
import CoinBaseRawResponse from "../interfices/CoinBaseRawResponse";
import getErrorMessage from "../utils/getErrorMessage";
import * as dotenv from "dotenv";

dotenv.config();

class CoinBaseClient {
  private API_URL = process.env.COINBASE_URL;

  getCoinBaseRates = async (): Promise<CoinBaseRawResponse> => {
    try {
      const { data: response } = await axios.get<CoinBaseRawResponse>(
        this.API_URL
      );
      return response;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default CoinBaseClient;
