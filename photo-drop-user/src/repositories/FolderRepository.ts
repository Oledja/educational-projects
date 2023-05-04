import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Folder, folders } from "../db/schema/schema";
import { eq } from "drizzle-orm";

export class FolderRepository {
  private db: NodePgDatabase = drizzle(pool);

  getFolder = async (id: string): Promise<Folder> => {
    const result = await this.db
      .select()
      .from(folders)
      .where(eq(folders.id, id));
    if (result.length === 0)
      throw new Error(`Folder with id: <${id}> doesn't exists`);
    return result[0];
  };
}
