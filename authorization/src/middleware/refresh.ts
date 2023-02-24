import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import CustomRequest from "../interfices/CustomRequest";
import TokenPayload from "../interfices/TokenPayload";

dotenv.config();

const SECRET = process.env.JWT_SECRET_KEY;
const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    const { username } = jwt.verify(token, SECRET) as TokenPayload;
    if (!username) throw new Error();
    (req as CustomRequest).token = token;
    next();
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
};

export { refresh };
