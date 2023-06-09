import generator from "generate-password";

const generatePassword = (): string => {
  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
  });
  return password;
};

export { generatePassword };
