import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Photo, UsersPhotos, photos, usersPhotos } from "../db/schema/schema";
import { eq } from "drizzle-orm";

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

  getUserPhotos = async (
    userId: UsersPhotos["userId"]
  ): Promise<UsersPhotos[]> => {
    return await this.db
      .select()
      .from(usersPhotos)
      .where(eq(usersPhotos.userId, userId));
  };

  unlockPhoto = async (
    userId: UsersPhotos["userId"],
    photoId: UsersPhotos["photoId"]
  ) => {
    await this.db
      .update(usersPhotos)
      .set({ isUnlocked: true })
      .where(
        eq(usersPhotos.userId, userId) && eq(usersPhotos.photoId, photoId)
      );
  };

  unmarkUserOnPhotos = async (userId: UsersPhotos["userId"]) => {
    await this.db.delete(usersPhotos).where(eq(usersPhotos.userId, userId));
  };
}
