import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import middy, {} from "@middy/core";
import * as Joi from "joi";
import { reqParamValidate } from "./reqParamValidate"
import { errorHandler } from "./errorHandler";

const schema = Joi.string()
                    .min(4)
                    .pattern(new RegExp('^([^0-9]*)$'));


const helloHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const name = event.queryStringParameters["name"];
  const response = buildResponse(200, name);
  return response;
}

function buildResponse(statusCode: number, body: string) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: `Hello ${JSON.stringify(body)}`
  }
}

export const hello: APIGatewayProxyHandler = middy(helloHandler)
                                              .use(reqParamValidate())
                                              .use(errorHandler());




