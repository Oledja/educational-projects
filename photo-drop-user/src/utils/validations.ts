import Joi from "joi";

export const validateLoginData = (login: { code: string; phone: string }) => {
  const loginSchema = Joi.object({
    code: Joi.string().required(),
    phone: Joi.string().required(),
  });

  return loginSchema.validate(login);
};

export const validatePhoneData = (phone: string) => {
  const verificationSchema = Joi.string().required();
  return verificationSchema.validate(phone);
};
