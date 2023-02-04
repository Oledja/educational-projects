declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REDIRECT_URI: string;
      SCOPES: string;
      PARENTS: string;
      SHORT_LINK_URL: string;
      SHORT_LINK_API_KEY: string;
      TOKENS_PATH: string;
    }
  }
}

export {};
