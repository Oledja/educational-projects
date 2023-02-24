import UserRepository from "../repositories/UserRepository";
import * as dotenv from "dotenv";
import { getErrorMessage, getTokens } from "../utils/util";
import User from "../interfices/User";
import Tokens from "../interfices/Tokens";
import jwt from "jsonwebtoken";
import TokenPayload from "../interfices/TokenPayload";
import GetMeResponse from "../interfices/GetMeResponse";

dotenv.config();

const SECRET = process.env.JWT_SECRET_KEY;

class UserService {
  private userRepository = new UserRepository();

  register = async (user: User): Promise<Tokens> => {
    const { username } = user;
    try {
      const candidate = await this.userRepository.getUser(username);
      if (!candidate) {
        const tokens = getTokens(username, "refresh", SECRET);
        user.refreshToken = tokens.refreshToken;
        await this.userRepository.saveUser(user);
        return tokens;
      }
      throw new Error(`User with username ${username} already exists`);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  login = async (user: User) => {
    const { username, password } = user;
    try {
      const userFromDB = await this.userRepository.getUser(username);
      if (!userFromDB)
        throw new Error(`User with username ${username} doesn't exists`);
      if (password != userFromDB.password)
        throw new Error(`Password isn't correct`);
      const tokens = getTokens(username, "refresh", SECRET);
      user.refreshToken = tokens.refreshToken;
      await this.userRepository.updateUser(user);
      return { tokens };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
  refresh = async (token: string): Promise<Tokens> => {
    try {
      const decoded = jwt.verify(token, SECRET);
      const { username } = decoded as TokenPayload;
      const user = await this.userRepository.getUser(username);
      if (!user) throw new Error("Provided token has invalid data");
      if (token != user.refreshToken)
        throw new Error("Provided token is not a refresh_token");
      const tokens = getTokens(username, "refresh", SECRET);
      user.refreshToken = tokens.refreshToken;
      await this.userRepository.updateUser(user);
      return tokens;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getME = (url: string, token: string): GetMeResponse => {
    try {
      const { username } = jwt.verify(token, SECRET) as TokenPayload;
      const requestNum = url.replace("/me", "");
      return {
        request_num: requestNum,
        data: {
          username: username,
        },
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}

export default UserService;
