declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: number;
      DB_USERNAME: string;
      APP_PORT: number;
      CERT_PATH: string;
      KEY_PATH: string;
      GEOCODE_API_KEY: string;
    }
  }
}

export {};
