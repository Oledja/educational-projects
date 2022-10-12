import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PATH_TO_FILE = __dirname + "\\userDB.txt";

const getUser = (username) => {
  const allUsers = getAllUser();
  return allUsers.filter((user) => user.name === username);
};

const saveUser = (user) => {
  try {
    fs.appendFileSync(PATH_TO_FILE, JSON.stringify(user) + "\n");
  } catch (err) {
    console.log(err);
  }
};

const getAllUser = () => {
  try {
    const allUsers = fs.readFileSync(PATH_TO_FILE, "utf-8").split("\n");
    return allUsers
      .filter((user) => user !== "")
      .map((user) => JSON.parse(user));
  } catch (err) {
    throw new Error("File doesn't exist");
  }
};

export { getUser, saveUser };
