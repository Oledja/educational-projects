import * as Joi from "joi";
import middy from "@middy/core";
import { APIGatewayEvent } from "aws-lambda";
import * as boom from "@hapi/boom";

export type MyRequestBody = {
  password: string;
  storeToken: string;
  username: string;
};

const validator: Joi.ObjectSchema<MyRequestBody> = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),

  storeToken: Joi.string(),
});

export const reqParamValidation = (): middy.MiddlewareObj<APIGatewayEvent> => {
  const before: middy.MiddlewareFn<APIGatewayEvent> = async (
    request
  ): Promise<void> => {
    const validationResult = validator.validate(JSON.parse(request.event.body));
    const { error } = validationResult;
    const valid = error == null;
    if (!valid) {
      throw boom.badData(error.message);
    }
  };
  return {
    before,
  };
};
