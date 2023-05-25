import { PhotoRepository } from "../repositories/PhotoRepository";
import { getErrorMessage } from "../utils/getErrorMessage";
import Stripe from "stripe";
import * as dotenv from "dotenv";
import { Album, Photo, User } from "../db/schema/schema";
import { AlbumService } from "./AlbumService";

dotenv.config();

const secretKey = process.env.STRIPE_PRIVATE_KEY;
const photoPrice = process.env.PHOTO_PRICE;
const unlockAlbumUrl = process.env.UNLOCK_ALBUM_URL;

export class StoreService {
  private photoRepository = new PhotoRepository();
  private albumService = new AlbumService();
  private stripe = new Stripe(secretKey, { apiVersion: "2022-11-15" });

  buyAlbum = async (
    userId: User["id"],
    albumId: Album["id"]
  ): Promise<string> => {
    try {
      const { name } = await this.albumService.getAlbum(albumId);
      const userPhotos = await this.photoRepository.getUserPhotos(userId);
      const photos = await Promise.all(
        userPhotos.map(async (p) => {
          return await this.photoRepository.getPhoto(p.photoId);
        })
      );
      const photosInFolder = photos.filter(
        (photo) => photo.albumId === albumId
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
        success_url: `${unlockAlbumUrl}/${albumId}/${userId}`,
      });
      const { url } = session;
      if (!url) throw new Error(`Problem with payment service`);
      return url;
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
            await this.unlockPhoto(userId, photo.id);
          }
        })
      );
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  private unlockPhoto = async (userId: User["id"], photoId: Photo["id"]) => {
    try {
      await this.photoRepository.unlockPhoto(userId, photoId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
