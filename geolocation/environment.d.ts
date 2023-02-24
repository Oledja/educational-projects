declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FILE_PATH: string;
      PORT: number;
    }
  }
}

export {};
