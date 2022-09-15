/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import middy from "@middy/core";
import { APIGatewayEvent } from "aws-lambda";
import * as boom from "@hapi/boom";
import connectDB from "../database/DBConnection";
import { MyRequestBody } from "./bodyValidator";
import { Store } from "../entity/store";

export const tokenValidatior = (): middy.MiddlewareObj<APIGatewayEvent> => {
  const before: middy.MiddlewareFn<APIGatewayEvent> = async (
    request
  ): Promise<void> => {
    const body: MyRequestBody = JSON.parse(request.event.body);
    if (!connectDB.isInitialized) {
      await connectDB.initialize();
    }
    const storeRepo = connectDB.getRepository<Store>(Store);
    const store = await storeRepo.findOne({
      where: {
        token: body.storeToken,
      },
    });

    if (!store) {
      throw boom.badRequest("Unexpected token");
    }
  };
  return {
    before,
  };
};
