import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Album, albums } from "../db/schema/schema";
import { eq } from "drizzle-orm";

export class AlbumRepository {
  private db: NodePgDatabase = drizzle(pool);

  getAlbum = async (albumId: Album["id"]): Promise<Album> => {
    const [result] = await this.db
      .select()
      .from(albums)
      .where(eq(albums.id, albumId));
    if (!result) throw new Error(`Album with id: <${albumId}> doesn't exists`);
    return result;
  };
}
