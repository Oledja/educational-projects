import axios from "axios";
import { ICoinMarketCapResponse } from "../@types/CoinMarketCap";
import * as dotenv from "dotenv";
import Markets from "../enums/Markets";
import CryptocurrencyClient from "../@types/CryptocurrencyClient";
import ICryptocurrency from "../@types/ICryptocurrency";
import cryptocurrencies from "../utill/Cryptocurrencies";

dotenv.config();

class CoinMarketCapClient implements CryptocurrencyClient {
  private API_KEY = process.env.COIN_MARKET_CAP_API_KEY;

  private API_URL = process.env.COIN_MARKET_CAP_URL;

  public async getCryptocurrencyRate() {
    const {
      data: { data: result },
    }: ICoinMarketCapResponse = await axios.get(this.API_URL, {
      headers: {
        "X-CMC_PRO_API_KEY": this.API_KEY,
      },
    });
    const response: ICryptocurrency[] = [];
    result.forEach((symbol) => {
      const name = cryptocurrencies.get(symbol.symbol);
      if (name) {
        response.push({
          symbol: symbol.symbol,
          price: symbol.quote.USD.price,
          market: Markets.COIN_MARKET_CAP,
          createdAt: new Date(),
          name,
        });
      }
    });
    return response;
  }
}

export default CoinMarketCapClient;
