import MonobankClient from "../clients/monobankClient";
enum CurrencyCode {
    usd = 840,
    eur = 978
}

type currencyType = {
    currencyCodeA: number,
    currencyCodeB: number,
    rateBuy: number,     
    rateSell: number
}

export default class MonobankService {
    private monobank: MonobankClient = new MonobankClient();
    private currentCurrency: currencyType[];

    
    private async updateExchangeRate(): Promise<void> {
        try {
            this.currentCurrency = await this.monobank.getCurrentExchangeRate();
        } catch (err) {
            console.log("timeout");
        }
    }

    private async getCurrency(code: CurrencyCode): Promise<currencyType> {
        await this.updateExchangeRate()
        return this.currentCurrency
            .filter(currency => currency.currencyCodeA === code)[0];
        
    }

    public async getExchangeRateUsd(): Promise<string> {
        const usd: currencyType = await this.getCurrency(CurrencyCode.usd);

        return `Monobank:💵 ${usd.rateBuy.toFixed(2)}/${usd.rateSell.toFixed(2)}`;
    }

    public async getExchangeRateEur(): Promise<string> {
        const eur: currencyType = await this.getCurrency(CurrencyCode.eur);

        return `Monobank:💶 ${eur.rateBuy.toFixed(2)}/${eur.rateSell.toFixed(2)}`;
    }
}
