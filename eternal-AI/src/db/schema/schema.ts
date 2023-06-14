import { InferModel } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  uniqueIndex,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    email: varchar("email").notNull(),
    password: varchar("password"),
    name: varchar("name"),
    phone: varchar("phone"),
    numberOfFreeQuestions: integer("numberOfFreeQuestions")
      .notNull()
      .default(5),
    recoveryCode: varchar("recoveryCode"),
    recoveryCodeCreatedAt: timestamp("recoveryCodeCreatedAt"),
  },
  (users) => ({ emailIdx: uniqueIndex("userEmailIdx").on(users.email) })
);

export const usersSubscriptions = pgTable(
  "usersSubscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id),
    customerId: varchar("customerId").notNull(),
    subscriptionId: varchar("subscriptionId").notNull(),
  },
  (usersSubscriptions) => ({
    userIdx: uniqueIndex("userIdx").on(usersSubscriptions.userId),
  })
);

export type User = InferModel<typeof users>;
export type Subscription = InferModel<typeof usersSubscriptions>;
