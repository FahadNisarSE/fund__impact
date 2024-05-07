"use server";

import db from "@/lib/db";
import { getUserByEmail, getUserById } from "../../db/model/users";
import { getVerificationTokenByToken } from "../../db/model/verification-token";
import { users, verificationToken } from "../../db/schema";
import { eq } from "drizzle-orm";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exists!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired..." };
  }

  const exisitingUser = await getUserByEmail(existingToken.email);

  if (!exisitingUser) {
    return { error: "Email does not exits!" };
  }

  await db
    .update(users)
    .set({ emailVerified: new Date(), email: existingToken.email })
    .where(eq(users.id, exisitingUser.id));

  await db
    .delete(verificationToken)
    .where(eq(verificationToken.email, existingToken.email));

  return { success: "User verified successsfully." };
};
