import CoinPaprikaClient from "../clients/CoinPaprikaClient";
import { cryptocurrencies } from "../utils/Cryptocurrencies";
import Crypto from "../interfices/Crypto";
import getErrorMessage from "../utils/getErrorMessage";

class CoinPaprikaService {
  private coinPaprikaClient = new CoinPaprikaClient();

  getCurrencyRate = async (): Promise<Crypto[]> => {
    const response: Crypto[] = [];
    try {
      const { data: rawResponse } =
        await this.coinPaprikaClient.getCoinPaprikaRates();
      cryptocurrencies.forEach((value, key) => {
        const currCrypto = rawResponse.find((crypto) => crypto.symbol === key);
        if (currCrypto) {
          const {
            quotes: {
              USD: { price },
            },
          } = currCrypto;
          const symbol = key;
          const name = value;
          const market = "CoinPaprika";
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

export default CoinPaprikaService;
