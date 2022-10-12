interface ICryptocurrency {
  averagePrice?: number;
  createdAt: Date;
  market: string;
  name: string;
  price?: number;
  symbol: string;
}

export default ICryptocurrency;
