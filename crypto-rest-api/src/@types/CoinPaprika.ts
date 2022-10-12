type CoinPaprika = {
  quotes: {
    USD: {
      price: number;
    };
  };
  symbol: string;
};

interface ICoinPaprikaResponse {
  data: [CoinPaprika];
}

export { ICoinPaprikaResponse, CoinPaprika };
