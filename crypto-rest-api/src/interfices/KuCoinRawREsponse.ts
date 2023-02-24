type KuCoin = {
  data: {
    [key: string]: string;
  };
};

interface KuCoinRawResponse {
  data: KuCoin;
}

export { KuCoinRawResponse, KuCoin };
