import middy from "@middy/core";
import { dataSource } from "../database/DBConnection";
import { Store } from "../entity/store";
import { APIGatewayEvent, MyRequestBody } from "../@types/APIGatewayEvent";
import * as boom from "@hapi/boom/lib/index";
import { Counter } from "../entity/counter";

const requestValidator = (): middy.MiddlewareObj<
  APIGatewayEvent<MyRequestBody>
> => {
  const before: middy.MiddlewareFn<APIGatewayEvent<MyRequestBody>> = async (
    request
  ): Promise<void> => {
    await dataSource.initialize();
    const {
      body: { storeToken },
    } = request.event;
    try {
      await dataSource.transaction("SERIALIZABLE", async (em) => {
        const store = await em.findOne(Store, {
          where: {
            token: storeToken,
          },
        });
        if (!store)
          throw boom.badRequest(`Store with token ${storeToken} doesn't exist`);
        const counter = await em.findOne(Counter, {
          where: {
            id: store.id,
          },
        });
        if (counter.count >= 10000)
          throw boom.badRequest("You have already used 10000 free calls");
        await em.update(Counter, store.id, {
          count: counter.count + 1,
        });
      });
    } finally {
      await dataSource.destroy();
    }
  };
  return {
    before,
  };
};
export { requestValidator };
