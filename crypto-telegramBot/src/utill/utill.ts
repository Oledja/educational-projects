import ICryptocurrency from "../interfaces/ICryptocurrency";
import IFullCurrencyInfo from "../interfaces/IFullCurrencyInfo";
import getErrorMessage from "./getErrorMessage";

const prepareListRecent = (currencies: ICryptocurrency[]): string => {
  let response = "";
  currencies.forEach(
    (currency) =>
      (response += `/${currency.symbol} ${currency.averagePrice}$\r\n`)
  );
  return response;
};

const prepareFullInfo = (
  fullInfo: IFullCurrencyInfo
) => `  ${fullInfo.symbol} (${fullInfo.name})

Average prices for:
  30 m:  ${fullInfo.prices.thirty_minutes}$
  1 h:   ${fullInfo.prices.one_hour}$
  3 h:   ${fullInfo.prices.three_hours}$
  6 h:   ${fullInfo.prices.six_hours}$
  12 h: ${fullInfo.prices.twenty_hours}$
  24 h: ${fullInfo.prices.day}$
  `;

const getAvgPriceByTime = (
  currencies: ICryptocurrency[],
  time: number
): number => {
  try {
    const filteredCurrencies = currencies.filter(
      (currency) =>
        new Date(currency.createdAt).getTime() > new Date().getTime() - time
    );
    const avg =
      filteredCurrencies
        .map((currency) => currency.price!)
        .reduce((price1, price2) => price1 + price2) /
      filteredCurrencies.length;
    return +avg.toFixed(2);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
};

export { prepareListRecent, prepareFullInfo, getAvgPriceByTime };
