import axios from "axios";
import Markets from "../enums/Markets";
import * as dotenv from "dotenv";
import CryptocurrencyClient from "../@types/CryptocurrencyClient";
import ICryptocurrency from "../@types/ICryptocurrency";
import { ICoinBaseResponse } from "../@types/CoinBase";
import cryptocurrencies from "../utill/Cryptocurrencies";

dotenv.config();

class CoinBaseClient implements CryptocurrencyClient {
  private API_URL = process.env.COINBASE_URL;

  public async getCryptocurrencyRate() {
    const {
      data: {
        data: { rates: response },
      },
    }: ICoinBaseResponse = await axios.get(this.API_URL);
    const currencies: ICryptocurrency[] = [];
    Object.keys(response).forEach((symbol) => {
      const name = cryptocurrencies.get(symbol);
      if (name) {
        currencies.push({
          symbol,
          price: 1 / +response[symbol],
          market: Markets.COIN_BASE,
          createdAt: new Date(),
          name,
        });
      }
    });
    return currencies;
  }
}

export default CoinBaseClient;
