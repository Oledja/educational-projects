import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { User, UsersPhotos, users, usersPhotos } from "../db/schema/schema";
import { eq } from "drizzle-orm/expressions";

export class UserRepository {
  private db: NodePgDatabase = drizzle(pool);

  getUser = async (id: string): Promise<User> => {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    if (result.length === 0)
      throw new Error(`User with id: <${id}> doesn't exists`);
    return result[0];
  };

  getUsers = async (): Promise<User[]> => {
    return await this.db.select().from(users);
  };

  getMarkedUsers = async (photoId: string): Promise<UsersPhotos[]> => {
    return await this.db
      .select()
      .from(usersPhotos)
      .where(eq(usersPhotos.photoId, photoId));
  };
}
