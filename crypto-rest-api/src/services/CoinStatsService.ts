import CoinStatsClient from "../clients/CoinStatsClient";
import { cryptocurrencies } from "../utils/Cryptocurrencies";
import getErrorMessage from "../utils/getErrorMessage";
import Crypto from "../interfices/Crypto";

class CoinStatsService {
  private coinStatsClient = new CoinStatsClient();

  getCurrencyRate = async (): Promise<Crypto[]> => {
    const response: Crypto[] = [];
    try {
      const { coins: rawResponse } =
        await this.coinStatsClient.getCoinStatsRates();
      cryptocurrencies.forEach((value, key) => {
        const currCrypto = rawResponse.find((crypto) => crypto.symbol === key);
        if (currCrypto) {
          const { price } = currCrypto;
          const symbol = key;
          const name = value;
          const market = "CoinStats";
          const createdAt = new Date();
          response.push({ symbol, name, price, market, createdAt });
        } else {
          throw new Error(`Cryptocurrency with symbol ${key} doesn't exists`);
        }
      });
      return response;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default CoinStatsService;
