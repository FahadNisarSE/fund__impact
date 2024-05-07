import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const DATABASE_CONNECTION = process.env.DATABASE_CONNECTION ?? "";

if (!DATABASE_CONNECTION) {
  console.log("DATABASE_CONNECTION_STRING does not exists.");
}

const sql = neon('postgresql://rajashaheryarahmedkhan:EgeUDy6nc5SB@ep-green-rice-a1tg2fz2.ap-southeast-1.aws.neon.tech/fund_impact?sslmode=require');

const db = drizzle(sql);

export default db;