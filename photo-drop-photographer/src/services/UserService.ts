import { UserRepository } from "../repositories/UserRepository";
import { ResponseUserDTO } from "../types/dto/user/ResponseUserDTO";
import { getErrorMessage } from "../utils/getErrorMessage";

export class UserService {
  private userRepository = new UserRepository();

  getUsers = async (): Promise<ResponseUserDTO[]> => {
    try {
      const users = await this.userRepository.getUsers();
      const responseUsers: ResponseUserDTO[] = users.map((user) => {
        const { id, phone, email } = user;
        return {
          id,
          phone,
          email,
        };
      });
      return responseUsers;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getMarkedUsers = async (photoId: string): Promise<ResponseUserDTO[]> => {
    try {
      const result = await this.userRepository.getMarkedUsers(photoId);
      const usersId = result.map((r) => r.userId);
      return Promise.all(
        usersId.map(async (userId) => {
          const { id, phone, email } = await this.userRepository.getUser(
            userId
          );
          return {
            id,
            phone,
            email,
          };
        })
      );
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
