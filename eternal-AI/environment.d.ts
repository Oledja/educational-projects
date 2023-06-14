declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PASSWORD: string;
      DB_USERNAME: string;
      DB_NAME: string;
      DB_PORT: number;
      APP_PORT: number;
      JWT_SECRET_KEY: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URL: string;
      GOOGLE_MAIL_PASSWORD: string;
      GOOGLE_MAIL_ACCOUNT: string;
      OPENAI_API_KEY: string;
      STRIPE_PRIVATE_KEY: string;
      PRODUCT_ID: string;
      CERT_PATH: string;
      KEY_PATH: string;
      RECOVERY_CODE_TIME_ACTION_MS: number;
    }
  }
}

export {};
