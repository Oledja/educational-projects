type CoinBase = {
  rates: {
    [key: string]: string;
  };
};

interface CoinBaseRawResponse {
  data: CoinBase;
}

export default CoinBaseRawResponse;
