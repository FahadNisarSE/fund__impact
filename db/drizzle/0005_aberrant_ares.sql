ALTER TABLE "verificationToken" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "verificationToken" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_email_unique" UNIQUE("email");