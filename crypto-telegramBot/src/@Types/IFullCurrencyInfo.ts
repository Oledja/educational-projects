interface IFullCurrencyInfo {
  name: string;
  prices: {
    day: number;
    one_hour: number;
    six_hours: number;
    thirty_minutes: number;
    three_hours: number;
    twenty_hours: number;
  };
  symbol: string;
}

export default IFullCurrencyInfo;
