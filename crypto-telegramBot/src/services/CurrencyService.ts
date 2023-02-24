import Time from "../enums/Time";
import ICryptocurrency from "../interfaces/ICryptocurrency";
import IFullCurrencyInfo from "../interfaces/IFullCurrencyInfo";
import CurrencyClient from "../clients/CurrencyClient";
import CurrencyRepository from "../repositories/CurrencyRepository";
import currencies from "../utill/Cryptocurrencies";
import { getAvgPriceByTime } from "../utill/utill";
import getErrorMessage from "../utill/getErrorMessage";

class CurrencyService {
  private currencyClient = new CurrencyClient();

  private currencyRepository = new CurrencyRepository();

  public async getRecentList(): Promise<ICryptocurrency[]> {
    try {
      const result = await Promise.all(
        currencies.map((currency) =>
          this.currencyClient.getAvgPriceByName(currency)
        )
      );
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getFullInfo(
    text: string
  ): Promise<IFullCurrencyInfo | undefined> {
    try {
      const symbol = text.replace("/", "");
      if (currencies.includes(symbol)) {
        const allCurrencies = await this.currencyClient.getAllCurrencyForDay(
          symbol
        );
        const flatCurrencies = allCurrencies.flat(1);
        return {
          symbol,
          name: flatCurrencies[0].name,
          prices: {
            thirty_minutes: getAvgPriceByTime(
              flatCurrencies,
              Time.THIRTY_MINUTES
            ),
            one_hour: getAvgPriceByTime(flatCurrencies, Time.ONE_HOUR),
            three_hours: getAvgPriceByTime(flatCurrencies, Time.THREE_HOURS),
            six_hours: getAvgPriceByTime(flatCurrencies, Time.SIX_HOURS),
            twenty_hours: getAvgPriceByTime(flatCurrencies, Time.TWENTY_HOURS),
            day: getAvgPriceByTime(flatCurrencies, Time.DAY),
          },
        };
      }
      return undefined;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getFavoriteList(chatId: number): Promise<ICryptocurrency[]> {
    try {
      const favoriteCurrencies = await this.currencyRepository.getAll(chatId);

      const result = await Promise.all(
        favoriteCurrencies.map((currency) =>
          this.currencyClient.getAvgPriceByName(currency.symbol)
        )
      );
      return result;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async addToFavoriteList(chatId: number, text: string) {
    try {
      const symbol = text.split(" ")[1];
      if (currencies.includes(symbol)) {
        await this.currencyRepository.save(chatId, symbol);
      }
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public deleteFromFavoriteList(chatId: number, text: string) {
    try {
      const symbol = text.split(" ")[1];
      this.currencyRepository.delete(chatId, symbol);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async existsInFavorite(
    chatId: number,
    symbol: string
  ): Promise<boolean> {
    try {
      const result = await this.currencyRepository.getOne(chatId, symbol);
      return result.length > 0;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }
}

export default CurrencyService;
