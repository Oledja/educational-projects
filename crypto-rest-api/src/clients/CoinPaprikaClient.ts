import axios from "axios";
import Markets from "../enums/Markets";
import { ICoinPaprikaResponse } from "../@types/CoinPaprika";
import CryptocurrencyClient from "../@types/CryptocurrencyClient";
import ICryptocurrency from "../@types/ICryptocurrency";
import cryptocurrencies from "../utill/Cryptocurrencies";

class CoinPaprikaClient implements CryptocurrencyClient {
  private API_URL = process.env.COIN_PAPRIKA_URL;

  public async getCryptocurrencyRate() {
    const { data: result }: ICoinPaprikaResponse = await axios.get(
      this.API_URL
    );
    const response: ICryptocurrency[] = [];
    result.forEach((symbol) => {
      const name = cryptocurrencies.get(symbol.symbol);
      if (name) {
        response.push({
          name,
          price: symbol.quotes.USD.price,
          market: Markets.COIN_PAPRIKA,
          createdAt: new Date(),
          symbol: symbol.symbol,
        });
      }
    });
    return response;
  }
}

export default CoinPaprikaClient;
