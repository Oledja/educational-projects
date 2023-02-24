import CoinBaseClient from "../clients/CoinBaseClient";
import { cryptocurrencies } from "../utils/Cryptocurrencies";
import Crypto from "../interfices/Crypto";
import getErrorMessage from "../utils/getErrorMessage";

class CoinBaseService {
  private coinBaseClient = new CoinBaseClient();

  getCurrencyRate = async (): Promise<Crypto[]> => {
    const response: Crypto[] = [];
    try {
      const rawResponse = await this.coinBaseClient.getCoinBaseRates();
      const {
        data: { rates },
      } = rawResponse;

      cryptocurrencies.forEach((value, key) => {
        const price = 1 / +rates[key];
        const symbol = key;
        const name = value;
        const market = "CoinBase";
        const createdAt = new Date();
        response.push({ symbol, name, price, market, createdAt });
      });
      return response;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
export default CoinBaseService;
