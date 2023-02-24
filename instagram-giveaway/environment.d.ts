declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DIR_PATH: string;
    }
  }
}

export {};
