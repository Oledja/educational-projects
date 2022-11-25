const errorHandler = (err: unknown) => {
  if (err instanceof Error) return new Error(err.message);
  return new Error();
};

export { errorHandler };
