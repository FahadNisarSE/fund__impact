CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"userId" text NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "passwordResetToken_email_token_pk" PRIMARY KEY("email","token"),
	CONSTRAINT "passwordResetToken_email_unique" UNIQUE("email"),
	CONSTRAINT "passwordResetToken_token_unique" UNIQUE("token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "passwordResetToken" ADD CONSTRAINT "passwordResetToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
