import { Currency } from "../interfices/currency";
import RequestOptions from "../interfices/RequestOptions";
import CryptoRepository from "../repositories/CryptoRepository";
import getErrorMessage from "../utils/getErrorMessage";
import { getAveragePrice, getFilterTime } from "../utils/utill";
import CoinBaseService from "./CoinBaseService";
import CoinMarketCapService from "./CoinMarketCapService";
import CoinPaprikaService from "./CoinPaprikaService";
import CoinStatsService from "./CoinStatsService";
import KuCoinService from "./KuCoinService";
import Crypto from "../interfices/Crypto";
import { cryptocurrencies } from "../utils/Cryptocurrencies";
import CryptoResponse from "../interfices/CryptoResponse";

class CryptoService {
  private cryptoRepository = new CryptoRepository();

  private coinBaseService = new CoinBaseService();

  private coinMarketCapService = new CoinMarketCapService();

  private coinPaprikaService = new CoinPaprikaService();

  private coinStatsService = new CoinStatsService();

  private kuCoinService = new KuCoinService();

  getCryptoRate = async (
    options: RequestOptions
  ): Promise<CryptoResponse[] | CryptoResponse> => {
    try {
      let result: Crypto[];
      let { symbol, market, time } = options;
      const filterTime = getFilterTime(time);
      if (market) {
        result = await this.cryptoRepository.getBySymbolAndTimeAndMarket(
          symbol,
          filterTime,
          market
        );
        return result;
      }
      result = await this.cryptoRepository.getBySymbolAndTime(
        symbol,
        filterTime
      );
      const price = getAveragePrice(result);
      const name = cryptocurrencies.get(symbol)!;
      return {
        symbol,
        name,
        price,
        market: "all markets",
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  saveRateByAllMarkets = async () => {
    try {
      const cryptoToSave: Currency[] = [];
      const results = await Promise.all([
        await this.coinBaseService.getCurrencyRate(),
        await this.coinMarketCapService.getCurrencyRate(),
        await this.coinPaprikaService.getCurrencyRate(),
        await this.coinStatsService.getCurrencyRate(),
        await this.kuCoinService.getCurrencyRate(),
      ]);

      results.forEach((crypto) => {
        crypto.forEach((c) => {
          cryptoToSave.push([c.symbol, c.name, c.price, c.market, c.createdAt]);
        });
      });
      await this.cryptoRepository.save(cryptoToSave);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default CryptoService;
