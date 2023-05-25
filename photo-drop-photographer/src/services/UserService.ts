import { Photo, User } from "../db/schema/schema";
import { UserRepository } from "../repositories/UserRepository";
import { ResponseUserDTO } from "../types/dto/user/ResponseUserDTO";
import { getErrorMessage } from "../utils/getErrorMessage";

export class UserService {
  private userRepository = new UserRepository();

  getUser = async (userId: User["id"]): Promise<User> => {
    try {
      return await this.userRepository.getUser(userId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getUsers = async (): Promise<ResponseUserDTO[]> => {
    try {
      const users = await this.userRepository.getUsers();
      const responseUsers: ResponseUserDTO[] = users.map((user) => {
        const { id, phone, email, name } = user;
        return {
          id,
          name,
          phone,
          email,
        };
      });
      return responseUsers;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
