/* eslint-disable no-param-reassign */
import middy from "@middy/core";

export function errorHandler<T, R>(): middy.MiddlewareObj<T, R> {
  return {
    onError: (handler: middy.Request): Promise<void> => {
      const { error } = handler;
      handler.response = {
        statusCode: 422,
        body: JSON.stringify({
          error: "Bad Request",
          cause: error.message,
          code: error.cause,
        }),
      };
      return Promise.resolve();
    },
  };
}
