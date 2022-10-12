import axios from "axios";
import Markets from "../enums/Markets";
import { ICoinStatsResponse } from "../@types/CoinStats";
import CryptocurrencyClient from "../@types/CryptocurrencyClient";
import ICryptocurrency from "../@types/ICryptocurrency";
import cryptocurrencies from "../utill/Cryptocurrencies";

class CoinStatsClient implements CryptocurrencyClient {
  private API_URL = process.env.COINSTATS_URL;

  public async getCryptocurrencyRate() {
    const {
      data: { coins: result },
    }: ICoinStatsResponse = await axios.get(this.API_URL);
    const response: ICryptocurrency[] = [];
    result.forEach((symbol) => {
      const name = cryptocurrencies.get(symbol.symbol);
      if (name) {
        response.push({
          name,
          price: symbol.price,
          market: Markets.COIN_STATS,
          createdAt: new Date(),
          symbol: symbol.symbol,
        });
      }
    });
    return response;
  }
}

export default CoinStatsClient;
