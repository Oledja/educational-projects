import { Folder, User } from "../db/schema/schema";
import { ResponseFolderDTO } from "../dto/photo/ResponseFolderDTO";
import { FolderRepository } from "../repositories/FolderRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { PhotoService } from "./PhotoService";

export class FolderService {
  private folderRepository = new FolderRepository();
  private photoService = new PhotoService();

  getFolder = async (folderId: Folder["id"]): Promise<Folder> => {
    try {
      return await this.folderRepository.getFolder(folderId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getUserFolder = async (
    userId: User["id"],
    folderId: Folder["id"]
  ): Promise<ResponseFolderDTO> => {
    try {
      const allPhotos = await this.photoService.getUserPhotos(userId);
      const photos = allPhotos.filter((p) => p.folderId === folderId);
      const folder = await this.folderRepository.getFolder(folderId);
      if (photos.length === 0)
        throw new Error(
          `User with id: <${userId}> is not mark in any of photos in folder with id: <${folderId}}> `
        );
      return {
        id: folder.id,
        name: folder.name,
        location: folder.location,
        date: folder.date,
        photos,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getUserFolders = async (userId: User["id"]): Promise<ResponseFolderDTO[]> => {
    try {
      const photos = await this.photoService.getUserPhotos(userId);
      const folders = await this.groupPhotoByFolder(photos);
      return folders;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  private groupPhotoByFolder = async (
    photos: ResponsePhotoDTO[]
  ): Promise<ResponseFolderDTO[]> => {
    const foldersIds: Set<string> = new Set();
    photos.forEach((p) => foldersIds.add(p.folderId));
    const folders: ResponseFolderDTO[] = await Promise.all(
      Array.from(foldersIds).map(async (folderId) => {
        const { id, name, location, date } = await this.getFolder(folderId);
        return {
          id,
          name,
          location,
          date,
          photos: [],
        } as ResponseFolderDTO;
      })
    );
    photos.forEach((photo) => {
      const { folderId } = photo;
      folders.forEach((folder) => {
        if (folder.id === folderId) folder.photos.push(photo);
        return;
      });
    });
    return folders;
  };
}
