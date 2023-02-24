type CoinPaprika = {
  quotes: {
    USD: {
      price: number;
    };
  };
  symbol: string;
};

interface CoinPaprikaRawResponse {
  data: CoinPaprika[];
}

export { CoinPaprikaRawResponse, CoinPaprika };
