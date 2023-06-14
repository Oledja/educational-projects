import Joi from "joi";
import { RequestLoginDTO } from "../dto/RequestLoginDTO";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";
import { RequestQuestionDTO } from "../dto/RequestQuestionDTO";
import { RequestFreeQuestion } from "../dto/RequestFreeQuestionDTO";
import { RequestPaymentCardDTO } from "../dto/RequestPaymentCardDTO";
import { RequestRestorePassword } from "../dto/RequestRestorePassword";

export const validateLoginData = (login: RequestLoginDTO) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return loginSchema.validate(login);
};

export const validateEmail = (email: string) => {
  const verificationSchema = Joi.string().email().required();
  return verificationSchema.validate(email);
};

export const validateUpdateUserData = (update: UpdateUserDTO) => {
  const updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
      .length(13)
      .pattern(/^\+380\d{3}\d{2}\d{2}\d{2}$/),
    password: Joi.string(),
    numberOfFreeQuestions: Joi.number(),
  });

  return updateUserSchema.validate(update);
};

export const validateQuestionData = (question: RequestQuestionDTO) => {
  const questionSchema = Joi.object({
    individual: Joi.string().required(),
    message: Joi.string().required(),
  });

  return questionSchema.validate(question);
};

export const validateFreeQuestionData = (question: RequestFreeQuestion) => {
  const questionSchema = Joi.object({
    individual: Joi.string().required(),
    questionNum: Joi.string().required(),
  });

  return questionSchema.validate(question);
};

export const validatePaymentCardData = (card: RequestPaymentCardDTO) => {
  const cardSchema = Joi.object({
    number: Joi.string().length(16).required(),
    exp_month: Joi.number().positive().min(1).max(12).required(),
    exp_year: Joi.number().positive().min(2022).required(),
    cvc: Joi.number().required(),
  });

  return cardSchema.validate(card);
};

export const validateRestorePassword = (restore: RequestRestorePassword) => {
  const recoveryPasswordSchema = Joi.object({
    email: Joi.string().email(),
    code: Joi.string(),
    password: Joi.string(),
  });

  return recoveryPasswordSchema.validate(restore);
};
