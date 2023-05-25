import { Album, Photographer } from "../db/schema/schema";
import { AlbumRepository } from "../repositories/AlbumRepository";
import { CreateAlbumDTO } from "../types/dto/folder/CreateAlbumDTO";
import { RequestCreateAlbum } from "../types/dto/folder/RequestCreateAlbum";
import { ResponseAlbumWithPhotosDTO } from "../types/dto/folder/ResponseAlbumWithPhotosDTO";
import { ResponseAlbumDTO } from "../types/dto/folder/ResponseAlbumDTO";
import { getFolderEnv } from "../utils/envUtils";
import { getErrorMessage } from "../utils/getErrorMessage";
import { PhotoService } from "./PhotoService";

export class AlbumService {
  private albumRepository = new AlbumRepository();
  private photoService = new PhotoService();

  getAlbum = async (
    albumId: Album["id"]
  ): Promise<ResponseAlbumWithPhotosDTO> => {
    try {
      const { id, name, location, date } = await this.albumRepository.getAlbum(
        albumId
      );
      let photosFromDB = await this.photoService.getPhotosByFolderId(albumId);
      const photos = await Promise.all(
        photosFromDB.map(async (photo) => {
          const { id, link } = photo;
          const largePhotoUrl = await this.photoService.getPhotoUrl(
            link,
            getFolderEnv("LARGE_PHOTO_S3_FOLDER")
          );
          const iconPhotoUrl = await this.photoService.getPhotoUrl(
            link,
            getFolderEnv("ICON_PHOTO_S3_FOLDER")
          );
          return {
            id,
            largePhotoUrl,
            iconPhotoUrl,
          };
        })
      );
      return {
        album: {
          id,
          name,
          location,
          date,
        },
        photos,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getAlbumsByPhotographerId = async (
    photographerId: Photographer["id"]
  ): Promise<ResponseAlbumDTO[]> => {
    try {
      const albums = await this.albumRepository.getPhotographerAlbums(
        photographerId
      );
      return albums.map((album) => {
        const { id, name, location } = album;
        return {
          id,
          name,
          location,
        };
      });
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  createAlbum = async (
    photographerId: Photographer["id"],
    album: RequestCreateAlbum
  ): Promise<ResponseAlbumDTO> => {
    try {
      const { name, location, date } = album;
      const create: CreateAlbumDTO = {
        name,
        location,
        date,
        photographerId,
      };
      const createdAlbum = await this.albumRepository.createAlbum(create);
      return {
        id: createdAlbum.id,
        name: createdAlbum.name,
        location: createdAlbum.location,
        date: createdAlbum.date,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };
}
