import { Request, Response, NextFunction } from "express";
import axios from "axios";

const linkMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { link: url },
  } = req;
  try {
    const { status: statusCode } = await axios.get(url);
    if (statusCode === 200) next();
  } catch (err) {
    res.status(404).json({ err: "Sorry,this link doesn't work." });
  }
};

export default linkMiddleware;
