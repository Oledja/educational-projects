import { PhotoRepository } from "../repositories/PhotoRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import Stripe from "stripe";
import * as dotenv from "dotenv";
import { FolderService } from "./FolderService";
import { Folder, Photo, User } from "../db/schema/schema";

dotenv.config();

const secretKey = process.env.STRIPE_PRIVATE_KEY;
const photoPrice = process.env.PHOTO_PRICE;
const successUrl = process.env.SUCCESS_URL;

export class StoreService {
  private photoRepository = new PhotoRepository();
  private folderService = new FolderService();
  private stripe = new Stripe(secretKey, { apiVersion: "2022-11-15" });

  buyPhoto = async (
    userId: User["id"],
    photoId: Photo["id"]
  ): Promise<string> => {
    try {
      const { folderId, link } = await this.photoRepository.getPhoto(photoId);
      const { name } = await this.folderService.getFolder(folderId);
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
            quantity: 1,
          },
        ],
        success_url: `${successUrl}${photoId}/${userId}`,
      });
      const { url } = session;
      if (!url) throw new Error(`Problem with payment service`);
      return url;
    } catch (err) {
      console.log(err);

      throw new Error(getErrorMessage(err));
    }
  };

  buyFolder = async (
    userId: User["id"],
    folderId: Folder["id"]
  ): Promise<string> => {
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

  unlockPhoto = async (userId: User["id"], photoId: Photo["id"]) => {
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
}
