import ICryptocurrency from "../@types/ICryptocurrency";
import Time from "../enums/Time";

const getFilterTime = (filterTime: string): number => {
  switch (filterTime) {
    case "FIFTY_MINUTES":
      return Time.FIFTY_MINUTES;
    case "ONE_HOUR":
      return Time.ONE_HOUR;
    case "FOUR_HOURS":
      return Time.FOUR_HOURS;
    default:
      return Time.DAY;
  }
};

const padTo2Digits = (num: number) => num.toString().padStart(2, "0");

const formatDate = (date: Date): string =>
  `${[
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-")} ${[
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    padTo2Digits(date.getSeconds()),
  ].join(":")}`;

const getAveragePrice = (currencies: ICryptocurrency[]): number => {
  const avg =
    currencies
      .map((currency) => currency.price!)
      .reduce((price1, price2) => price1 + price2) / currencies.length;
  return +avg.toFixed(2);
};

export { getFilterTime, formatDate, getAveragePrice };
