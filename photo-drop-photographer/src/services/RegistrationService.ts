import { CreatePhotographerDTO } from "../types/dto/photographer/CreatePhotographerDTO";
import { ResponsePhotographerDTO } from "../types/dto/photographer/ResponsePhotographerDTO";
import { PhotographerRepository } from "../repositories/PhotographerRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { LoginRequest } from "../types/dto/photographer/LoginRequest";
import { generateAccessToken } from "../utils/tokenGenerator";
import { LoginResponse } from "../types/dto/photographer/LoginResponse";

export class RegistrationService {
  private photographerRepository = new PhotographerRepository();

  signUp = async (
    photographer: CreatePhotographerDTO
  ): Promise<ResponsePhotographerDTO> => {
    try {
      const { id, login, email, fullname } =
        await this.photographerRepository.createPhotographer(photographer);
      return {
        id,
        login,
        email,
        fullname,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  login = async (loginPhotographer: LoginRequest): Promise<LoginResponse> => {
    try {
      try {
        const { login, password } = loginPhotographer;
        const photographer =
          await this.photographerRepository.getPhotographerByLogin(login);
        if (photographer.password !== password) throw new Error();
        const { id, email, fullname } = photographer;
        const token = generateAccessToken(id, login);
        return {
          photographer: {
            id,
            login,
            email,
            fullname,
          },
          accessToken: token,
        };
      } catch (err) {
        throw new Error(`The login or password is incorrect`);
      }
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
