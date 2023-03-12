declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      CERT_PATH: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: number;
      DB_USERNAME: string;
      KEY_PATH: string;
    }
  }
}

export {};
