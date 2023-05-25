CREATE TABLE IF NOT EXISTS "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"location" varchar NOT NULL,
	"date" date NOT NULL,
	"photographerId" uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS "photographers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"login" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar,
	"fullname" varchar
);

CREATE TABLE IF NOT EXISTS "photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link" varchar NOT NULL,
	"albumId" uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"selfie" varchar,
	"name" varchar,
	"phone" varchar NOT NULL,
	"email" varchar,
	"verificationCode" varchar NOT NULL,
	"codeGeneraitonTime" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "usersPhotos" (
	"userId" uuid NOT NULL,
	"photoId" uuid NOT NULL,
	"isUnlocked" boolean DEFAULT false NOT NULL,
	"albumId" uuid NOT NULL,
	"createdAt" date DEFAULT 'Wed May 24 2023'
);
ALTER TABLE "usersPhotos" ADD CONSTRAINT "usersPhotos_userId_photoId" PRIMARY KEY("userId","photoId");

DO $$ BEGIN
 ALTER TABLE "albums" ADD CONSTRAINT "albums_photographerId_photographers_id_fk" FOREIGN KEY ("photographerId") REFERENCES "photographers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "photos" ADD CONSTRAINT "photos_albumId_albums_id_fk" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "usersPhotos" ADD CONSTRAINT "usersPhotos_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "usersPhotos" ADD CONSTRAINT "usersPhotos_photoId_photos_id_fk" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "usersPhotos" ADD CONSTRAINT "usersPhotos_albumId_albums_id_fk" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "login_idx" ON "photographers" ("login");
CREATE UNIQUE INDEX IF NOT EXISTS "userPhoneIdx" ON "users" ("phone");