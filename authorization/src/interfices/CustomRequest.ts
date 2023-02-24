import { Request } from "express";

interface CustomRequest extends Request {
  token: string;
}

export default CustomRequest;
