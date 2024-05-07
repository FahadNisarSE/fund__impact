import db from "@/lib/db";
import { passwordResetToken, verificationToken } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const password_reset_token = await db
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.token, token));
    if (!password_reset_token.length) return null;
    return password_reset_token[0];
  } catch (error) {
    return null;
  }
};