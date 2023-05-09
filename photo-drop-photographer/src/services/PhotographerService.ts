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

  getPhotographer = async (
    photographerId: Photographer["id"]
  ): Promise<Photographer> => {
    try {
      return await this.photographerRepository.getPhotographer(photographerId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
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
    photographerId: Photographer["id"],
    update: UpdatePhotographerDTO
  ) => {
    try {
      await this.photographerRepository.updatePhotographer(
        photographerId,
        update
      );
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deletePhotographer = async (photographerId: Photographer["id"]) => {
    try {
      const folders = await this.folderService.getFoldersByPhotographerId(
        photographerId
      );
      await Promise.all(
        folders.map(async (folder) => {
          const { id } = folder;
          await this.folderService.deleteFolder(id);
        })
      );
      await this.photographerRepository.deletePhotographer(photographerId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
