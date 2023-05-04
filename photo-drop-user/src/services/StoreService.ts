import { PhotoRepository } from "../repositories/PhotoRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import Stripe from "stripe";
import * as dotenv from "dotenv";
import { FolderService } from "./FolderService";
import { S3Service } from "./S3Service";

dotenv.config();

const secretKey = process.env.STRIPE_PRIVATE_KEY;
const iconFolder = process.env.ICON_PHOTO_WITH_WATER_MARK_S3_FOLDER;
const photoPrice = process.env.PHOTO_PRICE;

export class StoreService {
  private photoRepository = new PhotoRepository();
  private folderService = new FolderService();
  private s3Service = new S3Service();
  private stripe = new Stripe(secretKey, { apiVersion: "2022-11-15" });

  buyPhoto = async (userId: string, photoId: string): Promise<string> => {
    try {
      const { folderId, link } = await this.photoRepository.getPhoto(photoId);
      const { name } = await this.folderService.getFolder(folderId);
      const key = `${iconFolder}/${link}`;
      const photoUrl = await this.s3Service.getPhotoUrl(key);
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Folder name: ${name}`,
                images: [photoUrl],
              },
              unit_amount: photoPrice,
            },
            quantity: 1,
          },
        ],
        success_url: `http://localhost:5534/api/v1/store/photos/${photoId}/${userId}`,
      });
      const { url } = session;
      if (!url) throw new Error(`Problem with payment service`);
      return url;
    } catch (err) {
      console.log(err);

      throw new Error(getErrorMessage(err));
    }
  };

  buyFolder = async (userId: string, folderId: string): Promise<string> => {
    try {
      const { name } = await this.folderService.getFolder(folderId);
      const userPhotos = await this.photoRepository.getUserPhotos(userId);
      const photos = await Promise.all(
        userPhotos.map(async (p) => {
          return await this.photoRepository.getPhoto(p.photoId);
        })
      );
      const photosInFolder = photos.filter(
        (photo) => photo.folderId === folderId
      );
      const photoCount = photosInFolder.length;
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Folder name: ${name}`,
              },
              unit_amount: photoPrice,
            },
            quantity: photoCount,
          },
        ],
        success_url: `http://localhost:5534/api/v1/store/folders/${folderId}/${userId}`,
      });
      const { url } = session;
      if (!url) throw new Error(`Problem with payment service`);
      return url;
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
}
