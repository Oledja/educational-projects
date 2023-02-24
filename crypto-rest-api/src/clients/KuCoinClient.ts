import axios from "axios";
import getErrorMessage from "../utils/getErrorMessage";
import * as dotenv from "dotenv";
import { KuCoin, KuCoinRawResponse } from "../interfices/KuCoinRawREsponse";

dotenv.config();

class KuCoinClient {
  private API_URL = process.env.KUCOIN_URL;

  getKuCoinRates = async (): Promise<KuCoinRawResponse> => {
    try {
      const { data: response } = await axios.get<KuCoin>(this.API_URL);
      return { data: response };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default KuCoinClient;
