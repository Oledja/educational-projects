declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: number;
      DB_USERNAME: string;
    }
  }
}

export {};
