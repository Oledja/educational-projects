import * as dotenv from "dotenv";

dotenv.config();

const timeOfActionMs = process.env.TIME_OF_ACTION_VERIFICATION_CODE;

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateCode = (codeLength: number) => {
  let result = "";
  for (let i = 0; i < codeLength; i++) {
    const value = getRandomInt(0, 9);
    result += value;
  }
  return result;
};

export const isCodeTimeExpired = (codeCreatedTime: Date): boolean => {
  return new Date().getTime() - codeCreatedTime.getTime() > timeOfActionMs
    ? true
    : false;
};
