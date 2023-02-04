export interface MonobankRawResponse {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateCross: number;
  rateSell: number;
}

export default MonobankRawResponse;
