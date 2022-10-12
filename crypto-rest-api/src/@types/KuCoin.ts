type KuCoin = {
  data: {
    [key: string]: string;
  };
};

interface IKuCoinResponse {
  data: KuCoin;
}

export { IKuCoinResponse, KuCoin };
