declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_DATABASE: string;
      DB_PASSWORD: string;
      BASE_URL: string;
      APP_PORT: string;
    }
  }
}

export {};
