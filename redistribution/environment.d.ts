declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RDS_DATABASE: string;
      RDS_HOST: string;
      RDS_PASSWORD: string;
      RDS_PORT: number;
      RDS_USERNAME: string;
      REGION: string;
      SQS_INVOCATION_URL: string;
      SQS_QUEUE_NAME: string;
    }
  }
}

export {};
