import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

const secretHash = process.env.AWS_COGNITO_SECRET_HASH;
const clientId = process.env.AWS_COGNITO_CLIENT_ID;

const generateSecretHash = (username: string): string => {
  const secret = crypto
    .createHmac("SHA256", secretHash)
    .update(username + clientId)
    .digest("base64");
  return secret;
};

export { generateSecretHash };
