declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USERNAME: string;
      DB_DATABASE: string;
      DB_PASSWORD: string;
    }
  }
}

export {};
