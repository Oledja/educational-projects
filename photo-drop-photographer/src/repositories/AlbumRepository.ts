import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Album, Photographer, albums } from "../db/schema/schema";
import { eq } from "drizzle-orm/expressions";
import { CreateAlbumDTO } from "../types/dto/folder/CreateAlbumDTO";

export class AlbumRepository {
  private db: NodePgDatabase = drizzle(pool);

  getAlbum = async (albumId: Album["id"]): Promise<Album> => {
    const [result] = await this.db
      .select()
      .from(albums)
      .where(eq(albums.id, albumId));
    if (!result) throw new Error(`Folder with id: <${albumId}> deosn't exists`);
    return result;
  };

  getPhotographerAlbums = async (
    photographerId: Photographer["id"]
  ): Promise<Album[]> => {
    return await this.db
      .select()
      .from(albums)
      .where(eq(albums.photographerId, photographerId));
  };

  createAlbum = async (create: CreateAlbumDTO): Promise<Album> => {
    const [result] = await this.db.insert(albums).values(create).returning();
    if (!result) throw new Error("Saving failed");
    return result;
  };
}
