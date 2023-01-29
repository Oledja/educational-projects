import * as fs from "fs";
import User from "../interface/User";

class UserRepository {
  private PATH_TO_FILE =
    "C:\\Users\\12345\\Desktop\\lambda-tasks\\primitiveDB\\build\\repository\\userDB.txt";

  public getUser = (username: string) => {
    console.log(username);
    const users = this.getAllUser();
    return users.filter((user) => user.name === username);
  };

  public saveUser = (user: User) => {
    try {
      fs.appendFileSync(this.PATH_TO_FILE, JSON.stringify(user) + "\n");
    } catch (err) {
      console.log(err);
    }
  };

  private getAllUser = (): User[] => {
    try {
      const allUsers = fs.readFileSync(this.PATH_TO_FILE, "utf-8").split("\n");
      return allUsers
        .filter((user) => user !== "")
        .map((user) => JSON.parse(user));
    } catch (err) {
      throw new Error("File doesn't exist");
    }
  };
}
export default UserRepository;
