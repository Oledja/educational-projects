import axios from "axios";
import Markets from "../enums/Markets";
import { IKuCoinResponse } from "../@types/KuCoin";
import ICryptocurrency from "../@types/ICryptocurrency";
import CryptocurrencyClient from "../@types/CryptocurrencyClient";
import cryptocurrencies from "../utill/Cryptocurrencies";

class KuCoinClient implements CryptocurrencyClient {
  private API_URL = process.env.KUCOIN_URL;

  public async getCryptocurrencyRate() {
    const {
      data: { data: result },
    }: IKuCoinResponse = await axios.get(this.API_URL);
    const response: ICryptocurrency[] = [];
    Object.keys(result).forEach((symbol) => {
      const name = cryptocurrencies.get(symbol);
      if (name) {
        response.push({
          name,
          price: +result[symbol],
          market: Markets.KU_COIN,
          createdAt: new Date(),
          symbol,
        });
      }
    });
    return response;
  }
}

export default KuCoinClient;
