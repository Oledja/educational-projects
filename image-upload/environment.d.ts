declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      AWS_COGNITO_CLIENT_ID: string;
      AWS_COGNITO_POOL_ID: string;
      AWS_COGNITO_SECRET_HASH: string;
      AWS_DYNAMO_DB_TABLE_NAME: string;
      AWS_REGION: string;
      AWS_S3_BUCKET_NAME: string;
    }
  }
}

export {};
