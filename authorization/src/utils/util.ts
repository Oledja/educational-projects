import Tokens from "../interfices/Tokens";
import jwt from "jsonwebtoken";

const getTimeAccesToken = (): number => {
  return Math.floor(30 + Math.random() * (60 - 30 + 1));
};

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return String(err);
};

const getTokens = (username: string, type: string, secret: string): Tokens => {
  const ttl = getTimeAccesToken();
  const accessToken = jwt.sign({ username }, secret, {
    expiresIn: `${ttl}s`,
  });
  const refreshToken = jwt.sign({ username, type }, secret, {
    expiresIn: "2d",
  });
  return { accessToken, refreshToken };
};
export { getTimeAccesToken, getErrorMessage, getTokens };
