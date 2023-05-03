import { Photographer } from "../db/schema/schema";
import { PhotographerRepository } from "../repositories/PhotographerRepository";
import { LoginRequest } from "../types/dto/photographer/LoginRequest";
import { UpdatePhotographerDTO } from "../types/dto/photographer/UpdatePhotographerDTO";
import { getErrorMessage } from "../utils/getErrorMessage";
import { generateAccessToken } from "../utils/tokenGenerator";
import { FolderService } from "./FolderService";

export class PhotographerService {
  private photographerRepository = new PhotographerRepository();
  private folderService = new FolderService();

  login = async (photographerLogin: LoginRequest): Promise<string> => {
    try {
      const { login, password } = photographerLogin;
      const photographer =
        await this.photographerRepository.getPhotographerByLogin(login);
      if (photographer.password !== password) throw new Error();
      const { id } = photographer;
      const token = generateAccessToken(id, login);
      return token;
    } catch (err) {
      throw new Error(`The login or password is incorrect`);
    }
  };

  getPhotographer = async (id: string): Promise<Photographer> => {
    try {
      return await this.photographerRepository.getPhotographer(id);
    } catch (err) {
      throw new Error(`Photographer with id: <${id}> doesn't exists`);
    }
  };

  getPhotographers = async (): Promise<Photographer[]> => {
    try {
      return await this.photographerRepository.getPhotographers();
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updatePhotographer = async (
    id: string,
    photographer: UpdatePhotographerDTO
  ) => {
    try {
      await this.photographerRepository.updatePhotographer(id, photographer);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deletePhotographer = async (id: string) => {
    try {
      const folders = await this.folderService.getFoldersByPhotographerId(id);
      await Promise.all(
        folders.map(async (folder) => {
          const { id } = folder;
          await this.folderService.deleteFolder(id);
        })
      );
      await this.photographerRepository.deletePhotographer(id);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
