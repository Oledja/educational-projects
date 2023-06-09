import { User } from "../db/schema/schema";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";
import { UserRepository } from "../repositories/UserRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { sendMail } from "../utils/mailSender";
import { generatePassword } from "../utils/passwordGenerator";

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

  resetPassword = async (email: User["email"]) => {
    try {
      const { id } = await this.getUserByEmail(email);
      const password = generatePassword();
      const message = `Your new password: ${password}`;
      await sendMail(email, message);
      await this.updateUser(id, { password });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
