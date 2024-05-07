import db from "@/lib/db";
import { passwordResetToken } from "../schema";
import { eq } from "drizzle-orm";

export default async function getPasswordResetToken(email: string) {
  try {
    const token = await db
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.email, email));

    if (token.length !== 0) return token[0];
    return null;
  } catch (error) {
    return null;
  }
}
