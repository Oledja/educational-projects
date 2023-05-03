import { PhotoRepository } from "../repositories/PhotoRepository";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { getErrorMessage } from "../utils/getErrorMessage";
import {
  addWatermark,
  resize,
  resizeAndAddWatermark,
} from "../utils/photoUtils";
import { S3Service } from "./S3Service";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Photo } from "../db/schema/schema";
import { UserService } from "./UserService";

dotenv.config();

const waterMarkPath = process.env.WATER_MARK_PATH;
const iconWaterMarkPath = process.env.ICON_WATER_MARK_PATH;
const s3Bucket = process.env.AWS_S3_BUCKET_NAME;
const largePhotoFolder = process.env.LARGE_PHOTO_S3_FOLDER;
const largePhotoWithWaterMarkFolder =
  process.env.LARGE_PHOTO_WITH_WATER_MARK_S3_FOLDER;
const iconFolder = process.env.ICON_PHOTO_S3_FOLDER;
const iconWaterMarkFolder = process.env.ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER;

export class PhotoService {
  private photoRepository = new PhotoRepository();
  private userService = new UserService();
  private s3Service = new S3Service();
  private waterMark: Buffer;
  private iconWaterMark: Buffer;

  constructor() {
    this.waterMark = readFileSync(waterMarkPath);
    this.iconWaterMark = readFileSync(iconWaterMarkPath);
  }

  getPhoto = async (photoId: string): Promise<Photo> => {
    try {
      return await this.photoRepository.getPhoto(photoId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getPhotosByFolderId = async (folderId: string): Promise<Photo[]> => {
    try {
      return await this.photoRepository.getFolderPhotos(folderId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getPhotoUrl = async (link: string, s3FolderName: string): Promise<string> => {
    try {
      const key = `${s3FolderName}/${link}`;
      return await this.s3Service.getPhotoUrl(key);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  addPhotos = async (folderId: string, photos: Express.Multer.File[]) => {
    try {
      photos.forEach(async (photo) => {
        const { buffer, originalname } = photo;
        const key = `${uuidv4()}-${originalname}`;
        await this.photoRepository.addPhotoToFolder(folderId, key);
        const photoWithWaterMark = await addWatermark(buffer, this.waterMark);
        const icon = await resize(buffer);
        const iconWithWaterMark = await resizeAndAddWatermark(
          buffer,
          this.iconWaterMark
        );
        const params: PutObjectRequest[] = [
          {
            Bucket: s3Bucket,
            Key: `${largePhotoWithWaterMarkFolder}/${key}`,
            Body: photoWithWaterMark,
          },
          {
            Bucket: s3Bucket,
            Key: `${iconFolder}/${key}`,
            Body: icon,
          },
          {
            Bucket: s3Bucket,
            Key: `${iconWaterMarkFolder}/${key}`,
            Body: iconWithWaterMark,
          },
          {
            Bucket: s3Bucket,
            Key: `${largePhotoFolder}/${key}`,
            Body: buffer,
          },
        ];
        params.forEach(this.s3Service.savePhoto);
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  deletePhoto = async (photoId: string) => {
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
        `${largePhotoFolder}/${link}`,
        `${largePhotoWithWaterMarkFolder}/${link}`,
        `${iconFolder}/${link}`,
        `${iconWaterMarkFolder}/${link}`,
      ];
      keys.forEach(this.s3Service.deletePhoto);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  markUserOnPhoto = async (userId: string, photoId: string) => {
    try {
      await this.photoRepository.markUserOnPhoto(userId, photoId);
    } catch (err) {
      console.log(err);

      throw new Error(
        getErrorMessage(
          `User with id: <${userId}> already marked on the photo with id: <${photoId}>`
        )
      );
    }
  };

  unmarkUserOnPhoto = async (userId: string, photoId: string) => {
    try {
      await this.photoRepository.unmarkUserOnPhoto(userId, photoId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
