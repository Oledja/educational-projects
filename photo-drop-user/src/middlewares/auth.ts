import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { tokenPayload } from "../interfaces/tokenPayload";
import { CustomRequest } from "../interfaces/CustomRequest";

dotenv.config();

const SECRET = process.env.JWT_SECRET_KEY;
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error();
    const { id } = jwt.verify(token, SECRET) as tokenPayload;
    (req as CustomRequest).id = id;
    next();
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
};
