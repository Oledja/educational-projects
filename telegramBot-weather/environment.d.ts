declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONOBANK_URL: string;
      PRIVATBANK_URL: string;
      OPENWEATHER_URL: string;
      TELEGRAM_BOT_TOKEN: string;
    }
  }
}

export {};
