import { ResponseAlbumDTO } from "./ResponseAlbumDTO";

export type ResponseAlbumWithPhotosDTO = {
  album: ResponseAlbumDTO;
  photos: ResponsePhotoDTO[];
};
