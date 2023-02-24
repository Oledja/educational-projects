import KuCoinClient from "../clients/KuCoinClient";
import { cryptocurrencies } from "../utils/Cryptocurrencies";
import getErrorMessage from "../utils/getErrorMessage";
import Crypto from "../interfices/Crypto";

class KuCoinService {
  private kuCoinClient = new KuCoinClient();

  getCurrencyRate = async () => {
    const response: Crypto[] = [];
    try {
      const rawResponse = await this.kuCoinClient.getKuCoinRates();
      const {
        data: { data },
      } = rawResponse;
      cryptocurrencies.forEach((value, key) => {
        const price = +data[key];
        const symbol = key;
        const name = value;
        const market = "KuCoin";
        const createdAt = new Date();
        response.push({ symbol, name, price, market, createdAt });
      });
      return response;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default KuCoinService;
