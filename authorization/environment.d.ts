declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      JWT_SECRET_KEY: string;
    }
  }
}

export {};
