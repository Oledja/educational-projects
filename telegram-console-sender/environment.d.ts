declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_TOKEN: string;
      TELEGRAM_CHAT_ID: string;
    }
  }
}

export {};
