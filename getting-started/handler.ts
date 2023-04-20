import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "@middy/core";
import { reqParamValidate } from "./reqParamValidate";
import { errorHandler } from "./errorHandler";
import * as Joi from "joi";

const schema: Joi.StringSchema = Joi.string()
  .min(1)
  .pattern(/^([^0-9]*)$/);

function buildResponse(statusCode: number, body: string) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: `${JSON.stringify(body)}`,
  };
}

const helloName = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { name } = event.queryStringParameters;
  const response = buildResponse(200, `Hello ${name}`);
  return response;
};

export async function fibonacci(): Promise<APIGatewayProxyResult> {
  const f = (n: number): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return f(n - 2) + f(n - 1);
  };
  const result: number[] = [];
  for (let i = 0; i <= 10; i++) {
    result.push(f(i));
  }
  const response = buildResponse(200, result.join(","));
  return response;
}

export const hello: APIGatewayProxyHandler = middy(helloName)
  .use(reqParamValidate(schema))
  .use(errorHandler());
