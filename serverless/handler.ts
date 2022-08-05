import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from "aws-lambda";
import middy from "@middy/core";
import { reqParamValidate } from "./reqParamValidate";
import { errorHandler } from "./errorHandler";
import * as Joi from "joi";

const schema: Joi.StringSchema = Joi.string()
  .min(4)
  .pattern(new RegExp("^([^0-9]*)$"));

function buildResponse(statusCode: number, body: string) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: `Hello ${JSON.stringify(body)}`,
  };
}

const helloHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const name = event.queryStringParameters.name;
  const response = buildResponse(200, name);
  return response;
};

export const hello: APIGatewayProxyHandler = middy(helloHandler)
  .use(reqParamValidate(schema))
  .use(errorHandler());
