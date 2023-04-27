import { CreatePhotographerDTO } from "../types/dto/photographer/CreatePhotographerDTO";
import { ResponsePhotographerDTO } from "../types/dto/photographer/ResponsePhotographerDTO";
import { PhotographerRepository } from "../repositories/PhotographerRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { LoginRequest } from "../types/dto/photographer/LoginRequest";
import { generateAccessToken } from "../utils/tokenGenerator";
import { FolderService } from "./FolderService";
import { LoginResponse } from "../types/dto/photographer/LoginResponse";

export class RegistrationService {
  private photographerRepository = new PhotographerRepository();
  private folderService = new FolderService();

  registration = async (
    photographer: CreatePhotographerDTO
  ): Promise<ResponsePhotographerDTO> => {
    try {
      return await this.photographerRepository.createPhotographer(photographer);
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
        const { id } = photographer;
        const token = generateAccessToken(id, login);
        const folders = await this.folderService.getFoldersByPhotographerId(id);
        return {
          photographer,
          folders,
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
