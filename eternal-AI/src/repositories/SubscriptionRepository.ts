import { eq } from "drizzle-orm";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../db/connection";
import { User, Subscription, usersSubscriptions } from "../db/schema/schema";
import { createSubscriptionDTO } from "../dto/CreateSubscriptionDTO";
import { UpdateSubscription } from "../dto/UpdateSubscriptionDTO";

export class SubscriptionRepository {
  private db: NodePgDatabase = drizzle(pool);

  getSubscription = async (
    userId: User["id"]
  ): Promise<Subscription | null> => {
    const [result] = await this.db
      .select()
      .from(usersSubscriptions)
      .where(eq(usersSubscriptions.userId, userId));
    return result ? result : null;
  };

  createSubscription = async (create: createSubscriptionDTO) => {
    const [result] = await this.db
      .insert(usersSubscriptions)
      .values(create)
      .returning();
    return result;
  };

  updateSubscription = async (
    userId: User["id"],
    update: UpdateSubscription
  ) => {
    await this.db
      .update(usersSubscriptions)
      .set(update)
      .where(eq(usersSubscriptions.userId, userId));
  };
}
