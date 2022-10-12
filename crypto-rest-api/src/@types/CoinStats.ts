type CoinStats = {
  price: number;
  symbol: string;
};

interface ICoinStatsResponse {
  data: {
    coins: [CoinStats];
  };
}

export { CoinStats, ICoinStatsResponse };
