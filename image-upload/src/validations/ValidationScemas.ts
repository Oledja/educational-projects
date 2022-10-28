import Joi from "joi";

const singUpSchema = Joi.object({
  username: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8),
});

const singInSchema = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(8),
});

const verifySchema = Joi.object({
  username: Joi.string().min(6).required(),
  code: Joi.string().min(6).max(6),
});

export { singUpSchema, singInSchema, verifySchema };
