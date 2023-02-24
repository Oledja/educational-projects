import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import TokenPayload from "../interfices/TokenPayload";
import CustomRequest from "../interfices/CustomRequest";

dotenv.config();

const SECRET = process.env.JWT_SECRET_KEY;
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    const { type } = jwt.verify(token, SECRET) as TokenPayload;
    if (type) throw new Error();
    (req as CustomRequest).token = token;
    next();
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
};

export { auth };
