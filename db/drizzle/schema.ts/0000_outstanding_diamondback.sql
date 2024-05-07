DO $$ BEGIN
 CREATE TYPE "userRole" AS ENUM('Creator', 'Supporter', 'Investor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"userRole" "userRole" NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
