export type CreatePhotoDTO = {
  photos: Express.Multer.File[];
  folderId: string;
};
