import { Folder, Photographer } from "../db/schema/schema";
import { FolderRepository } from "../repositories/FolderRepository";
import { CreateFolderDTO } from "../types/dto/folder/CreateFolderDTO";
import { RequestCreateFolder } from "../types/dto/folder/RequestCreateFolder";
import { ResponseFolderDTO } from "../types/dto/folder/ResponseFolderDTO";
import { ResponseFolderWithPhotosDTO } from "../types/dto/folder/ResponseFolderWithPhotosDTO";
import { UpdateFolderDTO } from "../types/dto/folder/UpdateFolderDTO";
import { getFolderEnv } from "../utils/envUtils";
import { getErrorMessage } from "../utils/getErrorMessage";
import { PhotoService } from "./PhotoService";

export class FolderService {
  private folderRepository = new FolderRepository();
  private photoService = new PhotoService();

  getFolder = async (
    folderId: Folder["id"]
  ): Promise<ResponseFolderWithPhotosDTO> => {
    try {
      const folder = await this.folderRepository.getFolder(folderId);
      let photosFromDB = await this.photoService.getPhotosByFolderId(folderId);
      const photos = await Promise.all(
        photosFromDB.map(async (photo) => {
          const { id, link } = photo;
          const largePhotoUrl = await this.photoService.getPhotoUrl(
            link,
            getFolderEnv("LARGE_PHOTO_S3_FOLDER")
          );
          const iconPhotoUrl = await this.photoService.getPhotoUrl(
            link,
            getFolderEnv("ICON_PHOTO_S3_FOLDER")
          );
          return {
            id,
            largePhotoUrl,
            iconPhotoUrl,
          };
        })
      );
      return {
        folder,
        photos,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getFoldersByPhotographerId = async (
    photographerId: Photographer["id"]
  ): Promise<ResponseFolderDTO[]> => {
    try {
      return await this.folderRepository.getPhotographerFolders(photographerId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  createFolder = async (
    photographerId: Photographer["id"],
    folder: RequestCreateFolder
  ): Promise<ResponseFolderDTO> => {
    try {
      const { name, location, date } = folder;
      const create: CreateFolderDTO = {
        name,
        location,
        date,
        photographerId,
      };
      return await this.folderRepository.createFolder(create);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updateFolder = async (folderId: Folder["id"], update: UpdateFolderDTO) => {
    try {
      await this.folderRepository.updateFolder(folderId, update);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deleteFolder = async (folderId: Folder["id"]) => {
    try {
      const photos = await this.photoService.getPhotosByFolderId(folderId);
      const photosId = photos.map((photo) => photo.id);
      await Promise.all(photosId.map(this.photoService.deletePhoto));
      await this.folderRepository.deleteFolder(folderId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
