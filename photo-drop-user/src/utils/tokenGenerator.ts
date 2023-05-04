import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

export const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, secret, { expiresIn: "2d" });
};
