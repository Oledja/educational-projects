import PrivatbankClient from "../clients/PrivatbankClient";
import PrivatCurrencyCode from "../enums/PrivatCurrencyCode";

const privatbank: PrivatbankClient = new PrivatbankClient();

class PrivatBankService {
  public async getExchangeRateUsd() {
    const usd = await getCurrency(PrivatCurrencyCode.usd);
    return `Privatbank:💵 ${Number(usd.buy).toFixed(2)}/${parseInt(
      usd.sale
    ).toFixed(2)}`;
  }

  public async getExchangeRateEur() {
    const eur = await getCurrency(PrivatCurrencyCode.eur);
    return `Privatbank:💶 ${Number(eur.buy).toFixed(2)}/${parseInt(
      eur.sale
    ).toFixed(2)}`;
  }
}
const getCurrency = async (name: PrivatCurrencyCode) => {
  const currentCurrency = await privatbank.getCurrentExchangeRate();
  return currentCurrency.filter((currency) => currency.ccy === name)[0];
};

export default PrivatBankService;
