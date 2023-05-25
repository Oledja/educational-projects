import { PhotoRepository } from "../repositories/PhotoRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import { S3Service } from "./S3Service";
import { Album, Photo, User, UsersPhotos } from "../db/schema/schema";
import { getFolderEnv } from "../utils/envUtils";

export class PhotoService {
  private photoRepository = new PhotoRepository();
  private s3Service = new S3Service();

  getPhoto = async (photoId: Photo["id"]): Promise<Photo> => {
    try {
      return await this.photoRepository.getPhoto(photoId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getUserPhotos = async (userId: User["id"]): Promise<ResponsePhotoDTO[]> => {
    try {
      const rawPhotos = await this.getRawUserPhotos(userId);
      return await Promise.all(
        rawPhotos.map(async (photo) => {
          return await this.getResponsePhoto(photo);
        })
      );
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getResponsePhoto = async (photo: UsersPhotos): Promise<ResponsePhotoDTO> => {
    try {
      const { photoId, isUnlocked } = photo;
      let { id, link, albumId } = await this.photoRepository.getPhoto(photoId);

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
        albumId,
        largePhotoUrl,
        iconPhotoUrl,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getRawUserPhotos = async (userId: User["id"]): Promise<UsersPhotos[]> => {
    try {
      return await this.photoRepository.getUserPhotos(userId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  unlockAlbum = async (userId: User["id"], albumId: Album["id"]) => {
    try {
      const userPhotos = await this.photoRepository.getUserPhotos(userId);
      await Promise.all(
        userPhotos.map(async (p) => {
          const photo = await this.photoRepository.getPhoto(p.photoId);
          if (photo.albumId === albumId) {
            await this.photoRepository.unlockPhoto(userId, photo.id);
          }
        })
      );
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
