import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "@middy/core";
import { reqParamValidate } from "./reqParamValidate.js";
import { errorHandler } from "./errorHandler.js";
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

const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { name } = event.queryStringParameters;
  const response = buildResponse(200, `Hello ${name}`);
  return response;
};

export async function fibonacchi(): Promise<APIGatewayProxyResult> {
  const fib = (n: number): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fib(n - 2) + fib(n - 1);
  };
  const result: number[] = [];
  for (let i = 0; i <= 10; i++) {
    result.push(fib(i));
  }
  const response = buildResponse(200, result.join(","));
  return response;
}

export const helloName: APIGatewayProxyHandler = middy(hello)
  .use(reqParamValidate(schema))
  .use(errorHandler());
