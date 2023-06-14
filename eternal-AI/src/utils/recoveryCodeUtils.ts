import * as dotenv from "dotenv";
import generator from "generate-password";

dotenv.config();

const timeOfActionMs = process.env.RECOVERY_CODE_TIME_ACTION_MS;

export const generateRecoveryCode = (): string => {
  const code = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
  });
  return code;
};

export const isCodeTimeExpired = (codeCreatedTime: Date): boolean => {
  return new Date().getTime() - codeCreatedTime.getTime() > timeOfActionMs
    ? true
    : false;
};
