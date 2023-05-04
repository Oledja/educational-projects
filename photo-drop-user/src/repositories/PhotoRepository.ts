import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Photo, UsersPhotos, photos, usersPhotos } from "../db/schema/schema";
import { eq } from "drizzle-orm";

export class PhotoRepository {
  private db: NodePgDatabase = drizzle(pool);

  getPhoto = async (id: string): Promise<Photo> => {
    const result = await this.db.select().from(photos).where(eq(photos.id, id));
    if (result.length === 0)
      throw new Error(`Photo with id: <${id}> doesn't exists`);
    return result[0];
  };

  getUserPhotos = async (userId: string): Promise<UsersPhotos[]> => {
    return await this.db
      .select()
      .from(usersPhotos)
      .where(eq(usersPhotos.userId, userId));
  };

  unlockPhoto = async (userId: string, photoId: string) => {
    await this.db
      .update(usersPhotos)
      .set({ isUnlocked: true })
      .where(
        eq(usersPhotos.userId, userId) && eq(usersPhotos.photoId, photoId)
      );
  };

  unmarkUserOnPhotos = async (userId: string) => {
    await this.db.delete(usersPhotos).where(eq(usersPhotos.userId, userId));
  };
}
