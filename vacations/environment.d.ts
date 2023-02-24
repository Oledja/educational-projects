declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FILE_PATH: string;
    }
  }
}

export {};
