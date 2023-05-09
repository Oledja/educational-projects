import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Folder, folders } from "../db/schema/schema";
import { eq } from "drizzle-orm";

export class FolderRepository {
  private db: NodePgDatabase = drizzle(pool);

  getFolder = async (folderId: Folder["id"]): Promise<Folder> => {
    const [result] = await this.db
      .select()
      .from(folders)
      .where(eq(folders.id, folderId));
    if (!result)
      throw new Error(`Folder with id: <${folderId}> doesn't exists`);
    return result;
  };
}
