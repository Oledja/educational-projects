CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar,
	"name" varchar,
	"phone" varchar,
	"numberOfFreeQuestions" integer DEFAULT 5 NOT NULL
);

CREATE TABLE IF NOT EXISTS "usersSubscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"customerId" varchar NOT NULL,
	"subscriptionId" varchar NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "userEmailIdx" ON "users" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "userIdx" ON "usersSubscriptions" ("userId");
DO $$ BEGIN
 ALTER TABLE "usersSubscriptions" ADD CONSTRAINT "usersSubscriptions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
