import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import {
  Folder,
  Photo,
  User,
  UsersPhotos,
  photos,
  usersPhotos,
} from "../db/schema/schema";
import { eq } from "drizzle-orm/expressions";

export class PhotoRepository {
  private db: NodePgDatabase = drizzle(pool);

  getPhoto = async (photoId: Photo["id"]): Promise<Photo> => {
    const [result] = await this.db
      .select()
      .from(photos)
      .where(eq(photos.id, photoId));
    if (!result) throw new Error(`Photo with id: <${photoId}> doesn't exists`);
    return result;
  };

  getFolderPhotos = async (folderId: Folder["id"]): Promise<Photo[]> => {
    return await this.db
      .select()
      .from(photos)
      .where(eq(photos.folderId, folderId));
  };

  addPhotoToFolder = async (folderId: Folder["id"], link: Photo["link"]) => {
    await this.db.insert(photos).values({ folderId, link });
  };

  deletePhoto = async (photoId: Photo["id"]) => {
    await this.db.delete(photos).where(eq(photos.id, photoId));
  };

  getMarkedUsersOnPhoto = async (
    photoId: Photo["id"]
  ): Promise<UsersPhotos[]> => {
    return await this.db
      .select()
      .from(usersPhotos)
      .where(eq(usersPhotos.photoId, photoId));
  };

  markUserOnPhoto = async (userId: User["id"], photoId: Photo["id"]) => {
    await this.db.insert(usersPhotos).values({ userId, photoId });
  };

  unmarkUserOnPhoto = async (userId: User["id"], photoId: Photo["id"]) => {
    await this.db
      .delete(usersPhotos)
      .where(
        eq(usersPhotos.userId, userId) && eq(usersPhotos.photoId, photoId)
      );
  };
}
