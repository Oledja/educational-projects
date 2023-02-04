declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_TOKEN: string;
      IMAGE_URL: string;
    }
  }
}

export {};
