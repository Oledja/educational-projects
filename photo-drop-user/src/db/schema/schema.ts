import { InferModel } from "drizzle-orm";
import { date, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { pgTable, uuid, uniqueIndex, boolean } from "drizzle-orm/pg-core";

export const photographers = pgTable(
  "photographers",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    login: varchar("login").notNull(),
    password: varchar("password").notNull(),
    email: varchar("email"),
    fullname: varchar("fullname"),
  },
  (photographers) => ({
    loginIdx: uniqueIndex("login_idx").on(photographers.login),
  })
);

export const folders = pgTable("folders", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name").notNull(),
  location: varchar("location").notNull(),
  date: date("date").notNull(),
  photographerId: uuid("photographerId")
    .references(() => photographers.id)
    .notNull(),
});

export const photos = pgTable("photos", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  link: varchar("link").notNull(),
  folderId: uuid("folderId")
    .references(() => folders.id)
    .notNull(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    selfie: varchar("selfie"),
    phone: varchar("phone").notNull(),
    email: varchar("email"),
    verificationCode: varchar("verificationCode").notNull(),
    codeGenerationTime: timestamp("codeGeneraitonTime").notNull(),
  },
  (users) => ({ phoneIdx: uniqueIndex("userPhoneIdx").on(users.phone) })
);

export const usersPhotos = pgTable(
  "usersPhotos",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id),
    photoId: uuid("photoId")
      .notNull()
      .references(() => photos.id),
    isUnlocked: boolean("isUnlocked").default(false).notNull(),
  },
  (usersPhotos) => ({
    cpk: primaryKey(usersPhotos.userId, usersPhotos.photoId),
  })
);

export type Photographer = InferModel<typeof photographers>;
export type Folder = InferModel<typeof folders>;
export type Photo = InferModel<typeof photos>;
export type User = InferModel<typeof users>;
export type UsersPhotos = InferModel<typeof usersPhotos>;
