import { User } from "../db/schema/schema";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { RequestRestorePassword } from "../dto/RequestRestorePassword";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";
import { UserRepository } from "../repositories/UserRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { isCodeTimeExpired } from "../utils/recoveryCodeUtils";

export class UserService {
  private userRepository = new UserRepository();

  getUser = async (userId: User["id"]): Promise<User> => {
    try {
      return await this.userRepository.getUser(userId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getUserByEmail = async (email: User["email"]): Promise<User> => {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  createUser = async (create: CreateUserDTO): Promise<User> => {
    try {
      return await this.userRepository.createUser(create);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updateUser = async (userId: User["id"], update: UpdateUserDTO) => {
    try {
      await this.userRepository.updateUser(userId, update);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  isUserExists = async (email: User["email"]): Promise<boolean> => {
    try {
      return await this.userRepository.isUserExists(email);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  restorePassword = async (restore: RequestRestorePassword) => {
    try {
      const { email, code, password } = restore;
      const { id, recoveryCode, recoveryCodeCreatedAt } =
        await this.getUserByEmail(email);
      if (!recoveryCode || !recoveryCodeCreatedAt)
        throw new Error("Password recovery request was not sent");
      if (code !== recoveryCode) throw new Error("Recovery code is invalid");
      if (isCodeTimeExpired(recoveryCodeCreatedAt))
        throw new Error("Recovery code expired");
      await this.updateUser(id, {
        password,
        recoveryCode: "",
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
