import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Photographer, photographers } from "../db/schema/schema";
import { eq } from "drizzle-orm/expressions";
import { CreatePhotographerDTO } from "../types/dto/photographer/CreatePhotographerDTO";
import { UpdatePhotographerDTO } from "../types/dto/photographer/UpdatePhotographerDTO";

export class PhotographerRepository {
  private db: NodePgDatabase = drizzle(pool);

  getPhotographer = async (photographerId: string): Promise<Photographer> => {
    const result = await this.db
      .select()
      .from(photographers)
      .where(eq(photographers.id, photographerId));
    if (result.length === 0) throw new Error();
    return result[0];
  };

  getPhotographerByLogin = async (login: string): Promise<Photographer> => {
    const result = await this.db
      .select()
      .from(photographers)
      .where(eq(photographers.login, login));
    if (result.length === 0) throw new Error();
    return result[0];
  };

  getPhotographers = async (): Promise<Photographer[]> => {
    return await this.db.select().from(photographers);
  };

  createPhotographer = async (
    create: CreatePhotographerDTO
  ): Promise<Photographer> => {
    const result = await this.db
      .insert(photographers)
      .values(create)
      .returning();
    if (result.length === 0) throw new Error("Filed save");
    return result[0];
  };

  updatePhotographer = async (
    photographerId: string,
    update: UpdatePhotographerDTO
  ) => {
    await this.db
      .update(photographers)
      .set(update)
      .where(eq(photographers.id, photographerId));
  };

  deletePhotographer = async (photographerId: string) => {
    await this.db
      .delete(photographers)
      .where(eq(photographers.id, photographerId));
  };
}
