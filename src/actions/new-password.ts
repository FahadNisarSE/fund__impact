"use server";

import bcrypt from "bcryptjs";

import { NewPasswordSchema, TNewPasswordSchema } from "@/schema/auth.schema";
import { getPasswordResetTokenByToken } from "../../db/model/password-reset-token";
import { getUserByEmail } from "../../db/model/users";
import db from "@/lib/db";
import { passwordResetToken, users } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function newPassword(
  values: TNewPasswordSchema,
  token: string | null
) {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFeilds = NewPasswordSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid Password." };
  }

  const { password } = validatedFeilds.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired." };
  }

  const exisitingUser = await getUserByEmail(existingToken.email);

  if (!exisitingUser) {
    return { error: "Email does not exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.id, exisitingUser.id));

  await db
    .delete(passwordResetToken)
    .where(eq(passwordResetToken.email, existingToken.email));

  return { success: "Password updated successfully." };
}
