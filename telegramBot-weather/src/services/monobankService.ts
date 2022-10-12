import MonobankClient from "../clients/MonobankClient";
import IMonobankResponse from "../interfaces/IMonobankResponse";
import MonoCurrencyCode from "../enums/MonoCurrencyCode";

const monobank = new MonobankClient();
let currentCurrency: IMonobankResponse[];

class MonobankService {
  public async getExchangeRateUsd(): Promise<string> {
    const usd = await getCurrency(MonoCurrencyCode.usd);
    return `Monobank:💵 ${usd.rateBuy.toFixed(2)}/${usd.rateSell.toFixed(2)}`;
  }

  public async getExchangeRateEur(): Promise<string> {
    const eur = await getCurrency(MonoCurrencyCode.eur);
    return `Monobank:💶 ${eur.rateBuy.toFixed(2)}/${eur.rateSell.toFixed(2)}`;
  }
}

const getCurrency = async (
  code: MonoCurrencyCode
): Promise<IMonobankResponse> => {
  await updateExchangeRate();
  return currentCurrency.filter(
    (currency) => currency.currencyCodeA === code
  )[0];
};

const updateExchangeRate = async (): Promise<void> => {
  try {
    currentCurrency = await monobank.getCurrentExchangeRate();
  } catch (err) {
    console.log("timeout");
  }
};

export default MonobankService;
