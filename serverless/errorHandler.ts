import middy from "@middy/core";
export function errorHandler<T, R>(): middy.MiddlewareObj<T, R> {
  return {
    onError: (handler: middy.Request): Promise<void> => {
      const error: Error = handler.error;
      handler.response = {
        statusCode: 400,
        body: JSON.stringify(error.message),
      };
      return Promise.resolve();
    },
  };
}
