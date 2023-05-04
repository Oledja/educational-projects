import { PhotoRepository } from "../repositories/PhotoRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import * as dotenv from "dotenv";
import { S3Service } from "./S3Service";

dotenv.config();

const largePhotoFolder = process.env.LARGE_PHOTO_S3_FOLDER;
const largePhotoWithWaterMarkFolder =
  process.env.LARGE_PHOTO_WITH_WATER_MARK_S3_FOLDER;
const iconFolder = process.env.ICON_PHOTO_S3_FOLDER;
const iconWithWaterMarkFolder =
  process.env.ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER;

export class PhotoService {
  private photoRepository = new PhotoRepository();
  private s3Service = new S3Service();

  getUserPhotos = async (userId: string): Promise<ResponsePhotoDTO[]> => {
    try {
      const usersPhotos = await this.photoRepository.getUserPhotos(userId);
      return Promise.all(
        usersPhotos.map(async (p) => {
          const { photoId, isUnlocked } = p;
          let { id, link, folderId } = await this.photoRepository.getPhoto(
            photoId
          );

          let largePhotokey = isUnlocked
            ? `${largePhotoFolder}/${link}`
            : `${largePhotoWithWaterMarkFolder}/${link}`;

          let iconPhotoKey = isUnlocked
            ? `${iconFolder}/${link}`
            : `${iconWithWaterMarkFolder}/${link}`;

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

  unlockPhoto = async (userId: string, photoId: string) => {
    try {
      await this.photoRepository.unlockPhoto(userId, photoId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  unlockFolder = async (userId: string, folderId: string) => {
    try {
      const userPhotos = await this.photoRepository.getUserPhotos(userId);
      userPhotos.forEach(async (p) => {
        const photo = await this.photoRepository.getPhoto(p.photoId);
        if (photo.folderId === folderId) {
          await this.unlockPhoto(userId, photo.id);
        }
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  unmarkUserOnPhotos = async (userId: string) => {
    try {
      await this.photoRepository.unmarkUserOnPhotos(userId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
