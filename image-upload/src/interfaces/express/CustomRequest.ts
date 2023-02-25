import { Request } from "express";

interface CustomRequest extends Request {
  username: string;
}

export default CustomRequest;
