import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Folder, Photographer, folders } from "../db/schema/schema";
import { eq } from "drizzle-orm/expressions";
import { CreateFolderDTO } from "../types/dto/folder/CreateFolderDTO";
import { UpdateFolderDTO } from "../types/dto/folder/UpdateFolderDTO";

export class FolderRepository {
  private db: NodePgDatabase = drizzle(pool);

  getFolder = async (folderId: Folder["id"]): Promise<Folder> => {
    const [result] = await this.db
      .select()
      .from(folders)
      .where(eq(folders.id, folderId));
    if (!result)
      throw new Error(`Folder with id: <${folderId}> deosn't exists`);
    return result;
  };

  getPhotographerFolders = async (
    photographerId: Photographer["id"]
  ): Promise<Folder[]> => {
    return await this.db
      .select()
      .from(folders)
      .where(eq(folders.photographerId, photographerId));
  };

  createFolder = async (create: CreateFolderDTO): Promise<Folder> => {
    const [result] = await this.db.insert(folders).values(create).returning();
    if (!result) throw new Error("Saving failed");
    return result;
  };

  updateFolder = async (folderId: Folder["id"], update: UpdateFolderDTO) => {
    await this.db.update(folders).set(update).where(eq(folders.id, folderId));
  };

  deleteFolder = async (folderId: Folder["id"]) => {
    await this.db.delete(folders).where(eq(folders.id, folderId));
  };
}
