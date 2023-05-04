import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { User, users } from "../db/schema/schema";
import { eq } from "drizzle-orm";
import { CreateUserDTO } from "../dto/user/CreateUserDTO";
import { UpdateUserDTO } from "../dto/user/UpdateUserDTO";

export class UserRepository {
  private db: NodePgDatabase = drizzle(pool);

  getUser = async (id: string): Promise<User> => {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    if (result.length === 0)
      throw new Error(`User with id: <${id}> deosn't exists`);
    return result[0];
  };

  getUserByPhone = async (phone: string): Promise<User | null> => {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.phone, phone));
    if (result.length === 0) return null;
    return result[0];
  };

  createUser = async (create: CreateUserDTO): Promise<User> => {
    const result = await this.db.insert(users).values(create).returning();
    return result[0];
  };

  updateUser = async (id: string, update: UpdateUserDTO) => {
    await this.db.update(users).set(update).where(eq(users.id, id));
  };

  deleteUser = async (id: string) => {
    await this.db.delete(users).where(eq(users.id, id));
  };
}
