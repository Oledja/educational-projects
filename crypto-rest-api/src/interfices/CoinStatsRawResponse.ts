type CoinStats = {
  price: number;
  symbol: string;
};

interface CoinsStatsRawResponse {
  coins: [CoinStats];
}

export default CoinsStatsRawResponse;
