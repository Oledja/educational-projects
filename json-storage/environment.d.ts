declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      APP_PORT: nmber;
    }
  }
}

export {};
