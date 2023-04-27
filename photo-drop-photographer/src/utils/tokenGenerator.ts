import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

export const generateAccessToken = (id: string, login: string): string => {
  return jwt.sign({ id, login }, secret);
};
