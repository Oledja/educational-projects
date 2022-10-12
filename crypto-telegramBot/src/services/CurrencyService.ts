import Time from "../enums/Time";
import ICryptocurrency from "../@Types/ICryptocurrency";
import IFullCurrencyInfo from "../@Types/IFullCurrencyInfo";
import CurrencyClient from "../clients/CurrencyClient";
import CurrencyRepository from "../repositories/CurrencyRepository";
import currencies from "../utill/Cryptocurrencies";
import { getAvgPriceByTime } from "../utill/utill";

class CurrencyService {
  private currencyClient = new CurrencyClient();

  private currencyRepository = new CurrencyRepository();

  public async getRecentList(): Promise<ICryptocurrency[]> {
    return Promise.all(
      currencies.map((currency) =>
        this.currencyClient.getAvgPriceByName(currency)
      )
    );
  }

  public async getFullInfo(
    text: string
  ): Promise<IFullCurrencyInfo | undefined> {
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
  }

  public async getFavoriteList(chatId: number): Promise<ICryptocurrency[]> {
    const favoriteCurrencies = await this.currencyRepository.getAll(chatId);

    return Promise.all(
      favoriteCurrencies.map((currency) =>
        this.currencyClient.getAvgPriceByName(currency.symbol)
      )
    );
  }

  public async addToFavoriteList(chatId: number, text: string) {
    const symbol = text.split(" ")[1];
    if (currencies.includes(symbol)) {
      await this.currencyRepository.save(chatId, symbol);
    }
  }

  public deleteFromFavoriteList(chatId: number, text: string) {
    const symbol = text.split(" ")[1];
    this.currencyRepository.delete(chatId, symbol);
  }

  public async existsInFavorite(
    chatId: number,
    symbol: string
  ): Promise<boolean> {
    const result = await this.currencyRepository.getOne(chatId, symbol);
    return result.length > 0;
  }
}

export default CurrencyService;
