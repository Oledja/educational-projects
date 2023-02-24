const generateShortLink = (): string => {
  let result = "/";
  const words =
    "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  const maxPosition = words.length - 1;
  for (let i = 0; i < 5; ++i) {
    const position = Math.floor(Math.random() * maxPosition);
    result = result + words.substring(position, position + 1);
  }
  return result;
};

export { generateShortLink }
