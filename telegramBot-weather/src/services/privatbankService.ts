import PrivatbankClient from "../clients/privatbankClient";
enum CurrencyName {
    usd = "USD",
    eur = "EUR"
}

export type currencyType = {
    ccy: string,
    base_ccy: string,
    buy: string,     
    sale: string
}

export default class PrivatBankService {
    private privatbank: PrivatbankClient = new PrivatbankClient();

    private async getCurrency(name: CurrencyName): Promise<currencyType> {
        const currentCurrency: currencyType[] = await this.privatbank.getCurrentExchangeRate();
        return currentCurrency.filter(currency => currency.ccy === name)[0];      
    }

    public async getExchangeRateUsd(): Promise<string> {
        const usd: currencyType = await this.getCurrency(CurrencyName.usd);

        return `Privatbank:💵 ${Number(usd.buy).toFixed(2)}/${Number(usd.sale).toFixed(2)}\n`;
    }

    public async getExchangeRateEur(): Promise<string> {
        const eur: currencyType = await this.getCurrency(CurrencyName.eur);

        return `Privatbank:💶 ${Number(eur.buy).toFixed(2)}/${Number(eur.sale).toFixed(2)}\n`;
    }
}