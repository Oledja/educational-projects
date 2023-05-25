import { Album, User, UsersPhotos } from "../db/schema/schema";
import { ResponseAlbumDTO } from "../dto/photo/ResponseAlbumDTO";
import { AlbumRepository } from "../repositories/AlbumRepository";
import { getFolderEnv } from "../utils/envUtils";
import { getErrorMessage } from "../utils/getErrorMessage";
import { PhotoService } from "./PhotoService";
import { S3Service } from "./S3Service";

export class AlbumService {
  private albumRepository = new AlbumRepository();
  private photoService = new PhotoService();
  private s3Service = new S3Service();

  getAlbum = async (albumId: Album["id"]): Promise<Album> => {
    try {
      return await this.albumRepository.getAlbum(albumId);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getUserAlbum = async (
    userId: User["id"],
    albumId: Album["id"]
  ): Promise<ResponseAlbumDTO> => {
    try {
      const allPhotos = await this.photoService.getRawUserPhotos(userId);
      const rawPhotos = allPhotos.filter((photo) => photo.albumId === albumId);
      const { id, name, location, date } = await this.albumRepository.getAlbum(
        albumId
      );
      if (rawPhotos.length === 0)
        throw new Error("User has no photos in this album");
      const bought = rawPhotos[0].isUnlocked;
      const photos = await Promise.all(
        rawPhotos.map(this.photoService.getResponsePhoto)
      );
      return {
        id,
        name,
        location,
        date,
        bought,
        photos,
      };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  getUserAlbums = async (userId: User["id"]): Promise<ResponseAlbumDTO[]> => {
    try {
      const photos = await this.photoService.getRawUserPhotos(userId);
      const albums = await this.groupPhotosByAlbums(photos);
      return albums;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  private groupPhotosByAlbums = async (
    photos: UsersPhotos[]
  ): Promise<ResponseAlbumDTO[]> => {
    const albumsIds: Set<string> = new Set();
    photos.forEach((p) => albumsIds.add(p.albumId));
    const albums: ResponseAlbumDTO[] = await Promise.all(
      Array.from(albumsIds).map(async (albumId) => {
        const albumPhotos = photos.filter((photo) => photo.albumId === albumId);
        const photoId = albumPhotos.pop()!.photoId;
        const { link } = await this.photoService.getPhoto(photoId);
        const coverPhoto = await this.s3Service.getPhotoUrl(
          `${getFolderEnv("ICON_PHOTO_S3_FOLDER")}/${link}`
        );
        const { id, name, location, date } = await this.getAlbum(albumId);
        return {
          id,
          name,
          location,
          date,
          coverPhoto,
        } as ResponseAlbumDTO;
      })
    );
    return albums;
  };
}
