type CoinMarketCap = {
  quote: {
    USD: {
      price: number;
    };
  };
  symbol: string;
};

interface ICoinMarketCapResponse {
  data: {
    data: [CoinMarketCap];
  };
}

export { ICoinMarketCapResponse, CoinMarketCap };
