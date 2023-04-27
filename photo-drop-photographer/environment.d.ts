declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: number;
      DB_USERNAME: string;
      APP_PORT: number;
      CERT_PATH: string;
      KEY_PATH: string;
      AWS_S3_BUCKET_NAME: string;
      REGION: string;
      JWT_SECRET_KEY: string;
      LARGE_PHOTO_S3_FOLDER: string;
      LARGE_PHOTO_WITH_WATER_MARK_S3_FOLDER: string;
      ICON_PHOTO_S3_FOLDER: string;
      ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER: string;
      WATER_MARK_PATH: string;
      ICON_WATER_MARK_PATH: string;
    }
  }
}

export {};
