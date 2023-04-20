import http from "k6/http";

const tokens: string[] = [
  "ROZETKA",
  "MOYO",
  "COMFY",
  "FOXTROT",
  "ELDORADO",
  "FAKE_STORE",
];

const names: string[] = [
  "Allen",
  "Bob",
  "Carlton",
  "David",
  "Ernie",
  "Foster",
  "George",
  "Howard",
  "Ian",
  "Jeffery",
  "Kenneth",
  "Lawrence",
  "Michael",
  "Nathen",
  "Orson",
  "Peter",
  "Quinten",
  "Reginald",
  "Stephen",
  "Thomas",
  "Morris",
  "Alice",
  "Bonnie",
  "Cassie",
  "Donna",
  "Ethel",
  "Grace",
  "Heather",
  "Jan",
  "Katherine",
  "Julie",
  "Marcia",
  "Patricia",
  "Mabel",
  "Jennifer",
  "Dorthey",
  "Mary Ellen",
  "Jacki",
  "Jean",
  "Betty",
  "Diane",
  "Annette",
  "Dawn",
  "Jody",
  "Karen",
];

const getRandomNumber = (min: number, max: number): number =>
  +(Math.random() * (max - min) + min).toFixed();

const generatePassword = (): string => {
  let password = "";
  const symbols =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return password;
};

const randomStoreToken = (): string => tokens[getRandomNumber(0, 5)];
const randomName = (): string => names[getRandomNumber(0, names.length - 1)];

export const options = {
  duration: "3s",
  vus: 300,
};

export default () => {
  const url =
    "https://rj77zce3xj.execute-api.us-east-1.amazonaws.com/dev/api/v1/redistribution";
  const payload = JSON.stringify({
    storeToken: randomStoreToken(),
    username: randomName(),
    password: generatePassword(),
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resp = http.post(url, payload, params);
  console.log(resp.error_code);
};
