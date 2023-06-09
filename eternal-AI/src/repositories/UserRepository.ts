import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { User, users } from "../db/schema/schema";
import { eq } from "drizzle-orm";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";

export class UserRepository {
  private db: NodePgDatabase = drizzle(pool);

  getUser = async (userId: User["id"]): Promise<User> => {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (!result) throw new Error(`User with id: <${userId}> doesn't exists`);
    return result;
  };

  getUserByEmail = async (email: User["email"]): Promise<User> => {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!result) throw new Error(`User with email: <${email}> doesn't exists`);
    return result;
  };

  createUser = async (create: CreateUserDTO): Promise<User> => {
    const [result] = await this.db.insert(users).values(create).returning();
    return result;
  };

  updateUser = async (userId: User["id"], update: UpdateUserDTO) => {
    await this.db.update(users).set(update).where(eq(users.id, userId));
  };

  isUserExists = async (email: User["email"]): Promise<boolean> => {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result ? true : false;
  };
}
