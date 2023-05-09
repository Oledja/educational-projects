import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import {
  Photo,
  User,
  UsersPhotos,
  users,
  usersPhotos,
} from "../db/schema/schema";
import { eq } from "drizzle-orm/expressions";

export class UserRepository {
  private db: NodePgDatabase = drizzle(pool);

  getUser = async (id: User["id"]): Promise<User> => {
    const [result] = await this.db.select().from(users).where(eq(users.id, id));
    if (!result) throw new Error(`User with id: <${id}> doesn't exists`);
    return result;
  };

  getUsers = async (): Promise<User[]> => {
    return await this.db.select().from(users);
  };

  getMarkedUsers = async (photoId: Photo["id"]): Promise<UsersPhotos[]> => {
    return await this.db
      .select()
      .from(usersPhotos)
      .where(eq(usersPhotos.photoId, photoId));
  };
}
