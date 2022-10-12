type CoinBase = {
  rates: {
    [key: string]: string;
  };
};

interface ICoinBaseResponse {
  data: {
    data: CoinBase;
  };
}

export { ICoinBaseResponse, CoinBase };
