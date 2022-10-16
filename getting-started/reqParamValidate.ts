import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import * as Joi from "joi";
import * as boom from "@hapi/boom";

export function reqParamValidate(
  schema: Joi.Schema
): middy.MiddlewareObj<APIGatewayEvent, APIGatewayProxyResult> {
  return {
    before: async (
      handler: middy.Request<APIGatewayEvent, APIGatewayProxyResult>
    ): Promise<void> => {
      const value: string | undefined =
        handler.event.queryStringParameters?.name;
      if (!value) {
        throw boom.badRequest("Add query parameter <name>");
      }
      if (schema.validate(value).error) {
        throw boom.badData(`Name can only contain letters <${value}>`);
      }
    },
  };
}
