import Time from "../enums/Time";
import Crypto from "../interfices/Crypto";

const getFilterTime = (filterTime: string): Date => {
  const time = new Date().getTime();
  switch (filterTime) {
    case "FIFTY_MINUTES":
      return new Date(time - Time.FIFTY_MINUTES);
    case "ONE_HOUR":
      return new Date(time - Time.ONE_HOUR);
    case "FOUR_HOURS":
      return new Date(time - Time.FOUR_HOURS);
    default:
      return new Date(time - Time.DAY);
  }
};

const getAveragePrice = (currencies: Crypto[]): number => {
  const avg =
    currencies.map((c) => c.price).reduce((price1, price2) => price1 + price2) /
    currencies.length;
  return +avg.toFixed(2);
};

export { getFilterTime, getAveragePrice };
