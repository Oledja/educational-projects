import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Album, Photo, User, photos, usersPhotos } from "../db/schema/schema";
import { and, eq } from "drizzle-orm/expressions";

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

  getAlbumPhotos = async (albumId: Album["id"]): Promise<Photo[]> => {
    return await this.db
      .select()
      .from(photos)
      .where(eq(photos.albumId, albumId));
  };

  addPhotoToAlbum = async (albumId: Album["id"], link: Photo["link"]) => {
    const [result] = await this.db
      .insert(photos)
      .values({ albumId, link })
      .returning({ id: photos.id });
    return result;
  };

  markUserOnPhoto = async (
    userId: User["id"],
    photoId: Photo["id"],
    albumId: Album["id"]
  ) => {
    await this.db.insert(usersPhotos).values({ userId, photoId, albumId });
  };

  isUserAlbumExists = async (
    userId: User["id"],
    albumId: Album["id"]
  ): Promise<boolean> => {
    const [result] = await this.db
      .select()
      .from(usersPhotos)
      .where(
        and(eq(usersPhotos.albumId, albumId), eq(usersPhotos.userId, userId))
      );
    return result ? true : false;
  };
}
