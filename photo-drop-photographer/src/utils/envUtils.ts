import * as dotenv from "dotenv";

dotenv.config;

type FoldersEnv =
  | "LARGE_PHOTO_S3_FOLDER"
  | "LARGE_PHOTO_WITH_WATER_MARK_S3_FOLDER"
  | "ICON_PHOTO_S3_FOLDER"
  | "ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER";

type DataBaseEnv = "DB_HOST" | "DB_PASSWORD" | "DB_USERNAME" | "DB_NAME";

export const getFolderEnv = (folderName: FoldersEnv): string => {
  return process.env[folderName];
};

export const getDBEnv = (envName: DataBaseEnv): string => {
  return process.env[envName];
};
