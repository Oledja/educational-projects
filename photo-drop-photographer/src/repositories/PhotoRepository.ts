import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Photo, UsersPhotos, photos, usersPhotos } from "../db/schema/schema";
import { eq } from "drizzle-orm/expressions";

export class PhotoRepository {
  private db: NodePgDatabase = drizzle(pool);

  getPhoto = async (photoId: string): Promise<Photo> => {
    const result = await this.db
      .select()
      .from(photos)
      .where(eq(photos.id, photoId));
    if (result.length === 0)
      throw new Error(`Photo with id: <${photoId}> doesn't exists`);
    return result[0];
  };

  getFolderPhotos = async (folderId: string): Promise<Photo[]> => {
    return await this.db
      .select()
      .from(photos)
      .where(eq(photos.folderId, folderId));
  };

  addPhotoToFolder = async (folderId: string, link: string) => {
    await this.db.insert(photos).values({ folderId, link });
  };

  deletePhoto = async (photoId: string) => {
    await this.db.delete(photos).where(eq(photos.id, photoId));
  };

  getMarkedUsersOnPhoto = async (photoId: string): Promise<UsersPhotos[]> => {
    return await this.db
      .select()
      .from(usersPhotos)
      .where(eq(usersPhotos.photoId, photoId));
  };

  markUserOnPhoto = async (userId: string, photoId: string) => {
    await this.db.insert(usersPhotos).values({ userId, photoId });
  };

  unmarkUserOnPhoto = async (userId: string, photoId: string) => {
    await this.db
      .delete(usersPhotos)
      .where(
        eq(usersPhotos.userId, userId) && eq(usersPhotos.photoId, photoId)
      );
  };
}
