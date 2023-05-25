declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: number;
      DB_USERNAME: string;
      TELEGRAM_BOT_TOKEN: string;
      TELEGRAM_CHAT_ID: number;
      APP_PORT: number;
      CERT_PATH: string;
      KEY_PATH: string;
      AWS_S3_BUCKET_NAME: string;
      REGION: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET_KEY: string;
      JWT_SECRET_KEY: string;
      TIME_OF_ACTION_VERIFICATION_CODE: number;
      VERIFICATION_CODE_LENGTH: number;
      STRIPE_PRIVATE_KEY: string;
      PHOTO_PRICE: number;
      LARGE_PHOTO_S3_FOLDER: string;
      LARGE_PHOTO_WITH_WATER_MARK_S3_FOLDER: string;
      ICON_PHOTO_S3_FOLDER: string;
      ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER: string;
      SELFIE_S3_FOLDER: string;
      SUCCESS_URL: string;
      UNLOCK_ALBUM_URL: string;
    }
  }
}

export {};
