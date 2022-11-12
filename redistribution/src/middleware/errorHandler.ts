import middy from "@middy/core";

const errorHandler = <T, R>(): middy.MiddlewareObj<T, R> => ({
  onError: (handler: middy.Request): Promise<void> => {
    const { error } = handler;
    handler.response = {
      statusCode: 400,
      body: JSON.stringify({
        error: "Bad Request",
        cause: error.message,
      }),
    };
    return Promise.resolve();
  },
});

export { errorHandler };
