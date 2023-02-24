declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_CLIENT_URL: string;
      TELEGRAM_BOT_TOKEN: string;
    }
  }
}

export {};
