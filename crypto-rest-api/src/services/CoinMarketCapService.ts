import CoinMarketCapClient from "../clients/CoinMarketCapClient";
import { cryptocurrencies } from "../utils/Cryptocurrencies";
import getErrorMessage from "../utils/getErrorMessage";
import Crypto from "../interfices/Crypto";

class CoinMarketCapService {
  private coinMarketCapClient = new CoinMarketCapClient();

  getCurrencyRate = async (): Promise<Crypto[]> => {
    const response: Crypto[] = [];
    try {
      const { data: rawResponse } =
        await this.coinMarketCapClient.getCoinMarketCapRates();
      cryptocurrencies.forEach((value, key) => {
        const currCrypto = rawResponse.find((crypto) => crypto.symbol === key);
        if (currCrypto) {
          const {
            quote: {
              USD: { price },
            },
          } = currCrypto;
          const symbol = key;
          const name = value;
          const market = "CoinMarketCap";
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

export default CoinMarketCapService;
