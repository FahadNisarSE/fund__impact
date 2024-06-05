import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

if (!("DATABASE_CONNECTION" in process.env))
  throw new Error("DATABASE_URL not found in environment");

export default {
  schema: "./db/schema.ts",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-green-rice-a1tg2fz2.ap-southeast-1.aws.neon.tech",
    user: "rajashaheryarahmedkhan",
    password: "EgeUDy6nc5SB",
    database: "fund_impact",
    ssl: "prefer",
  },
} satisfies Config;
