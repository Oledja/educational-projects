import { appendFileSync, readFileSync } from "fs";
import User from "../interface/User";

class UserRepository {
  private PATH_TO_FILE: string;

  constructor(path: string) {
    this.PATH_TO_FILE = path;
  }

  public getUser = (username: string) => {
    const users = this.getAllUser();
    return users.filter((user) => user.name === username);
  };

  public saveUser = (user: User) => {
    try {
      appendFileSync(this.PATH_TO_FILE, JSON.stringify(user) + "\n");
    } catch (err) {
      console.log(err);
    }
  };

  private getAllUser = (): User[] => {
    try {
      const allUsers = readFileSync(this.PATH_TO_FILE, "utf-8").split("\n");
      return allUsers
        .filter((user) => user !== "")
        .map((user) => JSON.parse(user));
    } catch (err) {
      throw new Error("File doesn't exist");
    }
  };
}

export default UserRepository;
