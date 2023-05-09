import { PhotoRepository } from "../repositories/PhotoRepository";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { getErrorMessage } from "../utils/getErrorMessage";
import { PhotoUtils } from "../utils/photoUtils";
import { S3Service } from "./S3Service";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Folder, Photo, User } from "../db/schema/schema";
import { UserService } from "./UserService";
import { getFolderEnv } from "../utils/envUtils";

dotenv.config();

const waterMarkPath = process.env.WATER_MARK_PATH;
const iconWaterMarkPath = process.env.ICON_WATER_MARK_PATH;
const s3Bucket = process.env.AWS_S3_BUCKET_NAME;

export class PhotoService {
  private photoRepository = new PhotoRepository();
  private userService = new UserService();
  private s3Service = new S3Service();
  private photoUtils = new PhotoUtils(400, 400);
  private waterMark: Buffer;
  private iconWaterMark: Buffer;

  constructor() {
    this.waterMark = readFileSync(waterMarkPath);
    this.iconWaterMark = readFileSync(iconWaterMarkPath);
  }

  getPhoto = async (photoId: Photo["id"]): Promise<Photo> => {
    try {
      return await this.photoRepository.getPhoto(photoId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getPhotosByFolderId = async (folderId: Folder["id"]): Promise<Photo[]> => {
    try {
      return await this.photoRepository.getFolderPhotos(folderId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getPhotoUrl = async (
    link: Photo["link"],
    s3FolderName: string
  ): Promise<string> => {
    try {
      const key = `${s3FolderName}/${link}`;
      return await this.s3Service.getPhotoUrl(key);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  addPhotos = async (folderId: Folder["id"], photos: Express.Multer.File[]) => {
    try {
      await Promise.all(
        photos.map(async (photo) => {
          const { buffer, originalname } = photo;
          const key = `${uuidv4()}-${originalname}`;
          await this.photoRepository.addPhotoToFolder(folderId, key);
          const photoWithWaterMark = await this.photoUtils.addWatermark(
            buffer,
            this.waterMark
          );
          const icon = await this.photoUtils.resize(buffer);
          const iconWithWaterMark = await this.photoUtils.resizeAndAddWatermark(
            buffer,
            this.iconWaterMark
          );
          const params: PutObjectRequest[] = [
            {
              Bucket: s3Bucket,
              Key: `${getFolderEnv(
                "LARGE_PHOTO_WITH_WATER_MARK_S3_FOLDER"
              )}/${key}`,
              Body: photoWithWaterMark,
            },
            {
              Bucket: s3Bucket,
              Key: `${getFolderEnv("ICON_PHOTO_S3_FOLDER")}/${key}`,
              Body: icon,
            },
            {
              Bucket: s3Bucket,
              Key: `${getFolderEnv(
                "ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER"
              )}/${key}`,
              Body: iconWithWaterMark,
            },
            {
              Bucket: s3Bucket,
              Key: `${getFolderEnv("LARGE_PHOTO_S3_FOLDER")}/${key}`,
              Body: buffer,
            },
          ];
          params.forEach(this.s3Service.savePhoto);
        })
      );
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deletePhoto = async (photoId: Photo["id"]) => {
    try {
      const { link } = await this.photoRepository.getPhoto(photoId);
      const markedUsers = await this.userService.getMarkedUsers(photoId);
      await Promise.all(
        markedUsers.map(
          async (user) => await this.unmarkUserOnPhoto(user.id, photoId)
        )
      );
      await this.photoRepository.deletePhoto(photoId);
      const keys: string[] = [
        `${getFolderEnv("LARGE_PHOTO_S3_FOLDER")}/${link}`,
        `${getFolderEnv("LARGE_PHOTO_WITH_WATER_MARK_S3_FOLDER")}/${link}`,
        `${getFolderEnv("ICON_PHOTO_S3_FOLDER")}/${link}`,
        `${getFolderEnv("ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER")}/${link}`,
      ];
      keys.forEach(this.s3Service.deletePhoto);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  markUserOnPhoto = async (userId: User["id"], photoId: Photo["id"]) => {
    try {
      await this.photoRepository.markUserOnPhoto(userId, photoId);
    } catch (err) {
      throw new Error(
        `User with id: <${userId}> already marked on the photo with id: <${photoId}>`
      );
    }
  };

  unmarkUserOnPhoto = async (userId: User["id"], photoId: Photo["id"]) => {
    try {
      await this.photoRepository.unmarkUserOnPhoto(userId, photoId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
