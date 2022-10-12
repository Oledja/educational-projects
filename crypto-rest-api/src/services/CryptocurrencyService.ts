import CryptocurrencyClient from "../@types/CryptocurrencyClient";
import ICryptocurrency from "../@types/ICryptocurrency";
import CryptocurrencyRepository from "../repositories/CryptocurrencyRepository";
import cryptocurrencies from "../utill/Cryptocurrencies";
import { getAveragePrice } from "../utill/utill";

class CryptocurrencyService {
  private cryptocurrencyRepository = new CryptocurrencyRepository();

  public async saveCryptocurrencyRate(clients: CryptocurrencyClient[]) {
    const result = await Promise.all(
      clients.map((client) => client.getCryptocurrencyRate())
    );
    const flatResult = result.flat(1);

    await Promise.all(
      flatResult.map((currency) => this.cryptocurrencyRepository.save(currency))
    );
  }

  public async getAveragePriceBySymbolAndTime(
    symbol: string,
    time: number
  ): Promise<ICryptocurrency> {
    const period = new Date(new Date().getTime() - time);
    const currencies: ICryptocurrency[] =
      await this.cryptocurrencyRepository.getCurrenciesBySymbol(symbol, period);
    const filteredCurrencies = currencies.filter(
      (currency) => currency.symbol === symbol
    );

    const averagePrice = getAveragePrice(filteredCurrencies);
    return {
      averagePrice,
      createdAt: new Date(),
      name: cryptocurrencies.get(symbol)!,
      market: "All  markets",
      symbol,
    };
  }

  public async getAveragePriceBySymbolAndMarketAndTime(
    symbol: string,
    market: string,
    time: number
  ): Promise<ICryptocurrency[]> {
    const period = new Date(new Date().getTime() - time);
    const currencies =
      await this.cryptocurrencyRepository.getAveragePriceBySymbolAndMarketAndTime(
        symbol,
        market,
        period
      );
    return currencies.filter(
      (currency) => currency.symbol === symbol && currency.market === market
    );
  }
}

export default CryptocurrencyService;
