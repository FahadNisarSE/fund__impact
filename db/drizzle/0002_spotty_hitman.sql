DROP TABLE "session";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_identifier_token_pk";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "user_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_email_token_pk" PRIMARY KEY("email","token");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD COLUMN "id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "verificationToken" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "verificationToken" DROP COLUMN IF EXISTS "identifier";--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_token_unique" UNIQUE("token");