import { PhotoRepository } from "../repositories/PhotoRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { S3Service } from "./S3Service";
import { Folder, User, UsersPhotos } from "../db/schema/schema";
import { getFolderEnv } from "../utils/envUtils";

export class PhotoService {
  private photoRepository = new PhotoRepository();
  private s3Service = new S3Service();

  getUserPhotos = async (userId: User["id"]): Promise<ResponsePhotoDTO[]> => {
    try {
      const usersPhotos = await this.photoRepository.getUserPhotos(userId);
      return Promise.all(
        usersPhotos.map(async (p) => {
          const { photoId, isUnlocked } = p;
          let { id, link, folderId } = await this.photoRepository.getPhoto(
            photoId
          );

          let largePhotokey = isUnlocked
            ? `${getFolderEnv("LARGE_PHOTO_S3_FOLDER")}/${link}`
            : `${getFolderEnv("ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER")}/${link}`;

          let iconPhotoKey = isUnlocked
            ? `${getFolderEnv("ICON_PHOTO_S3_FOLDER")}/${link}`
            : `${getFolderEnv("ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER")}/${link}`;

          const largePhotoUrl = await this.s3Service.getPhotoUrl(largePhotokey);
          const iconPhotoUrl = await this.s3Service.getPhotoUrl(iconPhotoKey);
          return {
            id,
            folderId,
            largePhotoUrl,
            iconPhotoUrl,
          };
        })
      );
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  unlockPhoto = async (
    userId: UsersPhotos["userId"],
    photoId: UsersPhotos["photoId"]
  ) => {
    try {
      await this.photoRepository.unlockPhoto(userId, photoId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  unlockFolder = async (userId: User["id"], folderId: Folder["id"]) => {
    try {
      const userPhotos = await this.photoRepository.getUserPhotos(userId);
      await Promise.all(
        userPhotos.map(async (p) => {
          const photo = await this.photoRepository.getPhoto(p.photoId);
          if (photo.folderId === folderId) {
            await this.unlockPhoto(userId, photo.id);
          }
        })
      );
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  unmarkUserOnPhotos = async (userId: UsersPhotos["userId"]) => {
    try {
      await this.photoRepository.unmarkUserOnPhotos(userId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
