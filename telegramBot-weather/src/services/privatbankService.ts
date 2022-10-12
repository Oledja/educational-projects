import PrivatbankClient from "../clients/PrivatbankClient";
import PrivatCurrencyCode from "../enums/PrivatCurrencyCode";
import IPrivatbankResponse from "../interfaces/IPrivatbankResponse";

const privatbank: PrivatbankClient = new PrivatbankClient();

class PrivatBankService {
  public async getExchangeRateUsd(): Promise<string> {
    const usd = await getCurrency(PrivatCurrencyCode.usd);
    return `Privatbank:💵 ${Number(usd.buy).toFixed(2)}/${parseInt(
      usd.sale
    ).toFixed(2)}`;
  }

  public async getExchangeRateEur(): Promise<string> {
    const eur = await getCurrency(PrivatCurrencyCode.eur);
    return `Privatbank:💶 ${Number(eur.buy).toFixed(2)}/${parseInt(
      eur.sale
    ).toFixed(2)}`;
  }
}
const getCurrency = async (
  name: PrivatCurrencyCode
): Promise<IPrivatbankResponse> => {
  const currentCurrency = await privatbank.getCurrentExchangeRate();
  return currentCurrency.filter((currency) => currency.ccy === name)[0];
};

export default PrivatBankService;
