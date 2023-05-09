import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { User, users } from "../db/schema/schema";
import { eq } from "drizzle-orm";
import { CreateUserDTO } from "../dto/user/CreateUserDTO";
import { UpdateUserDTO } from "../dto/user/UpdateUserDTO";

export class UserRepository {
  private db: NodePgDatabase = drizzle(pool);

  getUser = async (userId: User["id"]): Promise<User> => {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (!result) throw new Error(`User with id: <${userId}> deosn't exists`);
    return result;
  };

  getUserByPhone = async (phone: User["phone"]): Promise<User | null> => {
    const [result] = await this.db
      .select()
      .from(users)
      .where(eq(users.phone, phone));
    if (!result) return null;
    return result;
  };

  createUser = async (create: CreateUserDTO): Promise<User> => {
    const [result] = await this.db.insert(users).values(create).returning();
    return result;
  };

  updateUser = async (userId: User["id"], update: UpdateUserDTO) => {
    await this.db.update(users).set(update).where(eq(users.id, userId));
  };

  deleteUser = async (userId: User["id"]) => {
    await this.db.delete(users).where(eq(users.id, userId));
  };
}
