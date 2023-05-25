export type ResponseAlbumDTO = {
  id: string;
  name: string;
  location: string;
  date: string;
  coverPhoto?: string;
  bought?: boolean;
  photos?: ResponsePhotoDTO[];
};
