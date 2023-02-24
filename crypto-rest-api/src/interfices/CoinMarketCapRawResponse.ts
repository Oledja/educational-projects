type CoinMarketCap = {
  quote: {
    USD: {
      price: number;
    };
  };
  symbol: string;
};

interface CoinMarketCapRawResponse {
  data: [CoinMarketCap];
}

export default CoinMarketCapRawResponse;
