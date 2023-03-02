const WORDS = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

const generateShortLink = (): string => {
  let result = "/";

  const maxPosition = WORDS.length - 1;
  for (let i = 0; i < 5; ++i) {
    const position = Math.floor(Math.random() * maxPosition);
    result = result + WORDS.substring(position, position + 1);
  }
  return result;
};

export { generateShortLink };
