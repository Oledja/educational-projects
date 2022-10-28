import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const requestValidator =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json(error.details);
    } else next();
  };

export { requestValidator };
