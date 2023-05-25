import { PhotoRepository } from "../repositories/PhotoRepository";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { getErrorMessage } from "../utils/getErrorMessage";
import { PhotoUtils } from "../utils/photoUtils";
import { S3Service } from "./S3Service";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Album, Photo, User } from "../db/schema/schema";
import { getFolderEnv } from "../utils/envUtils";
import { sendMessage } from "../bot/telegeamBot";

dotenv.config();

const waterMarkPath = process.env.WATER_MARK_PATH;
const iconWaterMarkPath = process.env.ICON_WATER_MARK_PATH;
const s3Bucket = process.env.AWS_S3_BUCKET_NAME;
const chatId = process.env.TELEGRAM_CHAT_ID;

export class PhotoService {
  private photoRepository = new PhotoRepository();
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

  getPhotosByFolderId = async (albumId: Album["id"]): Promise<Photo[]> => {
    try {
      return await this.photoRepository.getAlbumPhotos(albumId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  addPhotos = async (
    albumId: Album["id"],
    photos: Express.Multer.File[]
  ): Promise<ResponsePhotoDTO[]> => {
    try {
      return await Promise.all(
        photos.map(async (photo) => {
          const usersIds = photo.fieldname.split(",");
          console.log(usersIds);

          const link = await this.savePhoto(photo);
          const photoId = await this.addPhotoToAlbum(albumId, link);
          await Promise.all(
            usersIds.map(async (userId) => {
              await this.markUserOnPhoto(userId, photoId, albumId);
            })
          );
          const largePhotoUrl = await this.getPhotoUrl(
            link,
            getFolderEnv("LARGE_PHOTO_S3_FOLDER")
          );
          const iconPhotoUrl = await this.getPhotoUrl(
            link,
            getFolderEnv("ICON_PHOTO_S3_FOLDER")
          );
          return {
            id: photoId,
            largePhotoUrl,
            iconPhotoUrl,
          };
        })
      );
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

  private savePhoto = async (photo: Express.Multer.File): Promise<string> => {
    try {
      const { buffer, originalname } = photo;
      const key = `${uuidv4()}-${originalname}`;

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
          Key: `${getFolderEnv("ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER")}/${key}`,
          Body: iconWithWaterMark,
        },
        {
          Bucket: s3Bucket,
          Key: `${getFolderEnv("LARGE_PHOTO_S3_FOLDER")}/${key}`,
          Body: buffer,
        },
      ];
      await Promise.all(params.map(this.s3Service.savePhoto));
      return key;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  private addPhotoToAlbum = async (
    albumId: string,
    link: string
  ): Promise<string> => {
    try {
      const { id } = await this.photoRepository.addPhotoToAlbum(albumId, link);
      return id;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  private markUserOnPhoto = async (
    userId: string,
    photoId: string,
    albumId: string
  ) => {
    try {
      const isAlbumExists = await this.photoRepository.isUserAlbumExists(
        userId,
        albumId
      );
      if (!isAlbumExists) {
        sendMessage(chatId, albumId);
      }
      await this.photoRepository.markUserOnPhoto(userId, photoId, albumId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
