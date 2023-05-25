import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { Photographer, photographers } from "../db/schema/schema";
import { eq } from "drizzle-orm/expressions";
import { CreatePhotographerDTO } from "../types/dto/photographer/CreatePhotographerDTO";
import { UpdatePhotographerDTO } from "../types/dto/photographer/UpdatePhotographerDTO";

export class PhotographerRepository {
  private db: NodePgDatabase = drizzle(pool);

  getPhotographer = async (
    photographerId: Photographer["id"]
  ): Promise<Photographer> => {
    const [result] = await this.db
      .select()
      .from(photographers)
      .where(eq(photographers.id, photographerId));
    if (!result)
      throw new Error(
        `Photographer with id: <${photographerId}> doesn't exists`
      );
    return result;
  };

  getPhotographerByLogin = async (
    login: Photographer["login"]
  ): Promise<Photographer> => {
    const [result] = await this.db
      .select()
      .from(photographers)
      .where(eq(photographers.login, login));
    if (!result)
      throw new Error(`Photographer with login: <${login}> doesn't exists`);
    return result;
  };

  getPhotographers = async (): Promise<Photographer[]> => {
    return await this.db.select().from(photographers);
  };

  createPhotographer = async (
    create: CreatePhotographerDTO
  ): Promise<Photographer> => {
    const [result] = await this.db
      .insert(photographers)
      .values(create)
      .returning();
    if (!result) throw new Error("Saving failed");
    return result;
  };
}
