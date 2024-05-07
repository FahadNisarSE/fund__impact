CREATE TABLE IF NOT EXISTS "verificationToken" (
	"id" text NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_email_token_pk" PRIMARY KEY("email","token"),
	CONSTRAINT "verificationToken_token_unique" UNIQUE("token")
);
