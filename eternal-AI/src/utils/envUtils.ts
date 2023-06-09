import * as dotenv from "dotenv";

dotenv.config;

type DataBaseEnv = "DB_HOST" | "DB_PASSWORD" | "DB_USERNAME" | "DB_NAME";
type GoogleEnv =
  | "GOOGLE_CLIENT_ID"
  | "GOOGLE_CLIENT_SECRET"
  | "GOOGLE_REDIRECT_URL";

export const getDBEnv = (envName: DataBaseEnv): string => {
  return process.env[envName];
};

export const getGoogleEnv = (envName: GoogleEnv): string => {
  return process.env[envName];
};
