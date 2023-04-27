import { FolderRepository } from "../repositories/FolderRepository";
import { CreateFolderDTO } from "../types/dto/folder/CreateFolderDTO";
import { ResponseFolderDTO } from "../types/dto/folder/ResponseFolderDTO";
import { ResponseFolderWithPhotosDTO } from "../types/dto/folder/ResponseFolderWithPhotosDTO";
import { UpdateFolderDTO } from "../types/dto/folder/UpdateFolderDTO";
import { getErrorMessage } from "../utils/getErrorMessage";
import { PhotoService } from "./PhotoService";
import * as dotenv from "dotenv";

dotenv.config();

const largePhotoFolder = process.env.LARGE_PHOTO_S3_FOLDER;
const iconPhotoFolder = process.env.ICON_PHOTO_S3_FOLDER;

export class FolderService {
  private folderRepository = new FolderRepository();
  private photoService = new PhotoService();

  getFolder = async (
    folderId: string
  ): Promise<ResponseFolderWithPhotosDTO> => {
    try {
      const folder = await this.folderRepository.getFolder(folderId);
      let photosFromDB = await this.photoService.getPhotosByFolderId(folderId);
      const photos = await Promise.all(
        photosFromDB.map(async (photo) => {
          const { id, link } = photo;
          const largePhotoUrl = await this.photoService.getPhotoUrl(
            link,
            largePhotoFolder
          );
          const iconPhotoUrl = await this.photoService.getPhotoUrl(
            link,
            iconPhotoFolder
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
    photographerId: string
  ): Promise<ResponseFolderDTO[]> => {
    try {
      return await this.folderRepository.getPhotographerFolders(photographerId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  createFolder = async (
    create: CreateFolderDTO
  ): Promise<ResponseFolderDTO> => {
    try {
      return await this.folderRepository.createFolder(create);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  updateFolder = async (folderId: string, update: UpdateFolderDTO) => {
    try {
      await this.folderRepository.updateFolder(folderId, update);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deleteFolder = async (folderId: string) => {
    try {
      const photos = await this.photoService.getPhotosByFolderId(folderId);
      const photosId = photos.map((photo) => photo.id);
      await Promise.all(photosId.map(await this.photoService.deletePhoto));
      await this.folderRepository.deleteFolder(folderId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
