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
  .min(4)
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

const helloHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { name } = event.queryStringParameters;
  const response = buildResponse(200, `Hello ${name}`);
  return response;
};

export async function fibonacchiHandler(): Promise<APIGatewayProxyResult> {
  const fibonacchi = (n: number): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacchi(n - 2) + fibonacchi(n - 1);
  };
  const result: number[] = [];
  for (let i = 0; i <= 10; i++) {
    result.push(fibonacchi(i));
  }
  const response = buildResponse(200, result.join(","));
  return response;
}

export const hello: APIGatewayProxyHandler = middy(helloHandler)
  .use(reqParamValidate(schema))
  .use(errorHandler());
