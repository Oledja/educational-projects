import { getConnection } from "../db/connection";
import User from "../interfices/User";

class UserRepository {
  private connection = getConnection<User>("users");

  saveUser = async (user: User) => {
    const connection = await this.connection;
    return connection.insertOne(user);
  };

  getUser = async (username: string): Promise<User | null> => {
    const connection = await this.connection;
    return connection.findOne({ username });
  };

  updateUser = async (user: User) => {
    const connection = await this.connection;
    const { username, refreshToken } = user;
    connection.updateOne({ username }, { $set: { refreshToken } });
  };
}

export default UserRepository;
