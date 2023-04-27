import { ResponseFolderDTO } from "./ResponseFolderDTO";

export type ResponseFolderWithPhotosDTO = {
  folder: ResponseFolderDTO;
  photos: ResponsePhotoDTO[];
};
