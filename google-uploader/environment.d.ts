declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REDIRECT_URI: string;
      API_KEY: string;
      SCOPES: string;
      PARENTS: string;
    }
  }
}

export {};
