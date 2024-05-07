import db from "@/lib/db";
import { verificationToken } from "../../db/schema";
import { eq } from "drizzle-orm";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verification_token = await db
      .select()
      .from(verificationToken)
      .where(eq(verificationToken.email, email));
    if (!verification_token.length) return null;
    return verification_token[0];
  } catch (error) {
    return null;
  }
};

export const updateVerificationToken = async (
  id: string,
  email: string,
  token: string,
  expires: Date
) => {
  try {
    return await db
      .update(verificationToken)
      .set({
        token,
        expires,
      })
      .where(eq(verificationToken.email, email)).returning();
  } catch (error) {
    return null;
  }
};

export const createVerificationToken = async (
  id: string,
  email: string,
  token: string,
  expires: Date
) => {
  try {
    return await db.insert(verificationToken).values({
      userId: id,
      email,
      token,
      expires,
    }).returning();
  } catch (error) {
    console.log("Error: ", error)
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verification_token = await db
      .select()
      .from(verificationToken)
      .where(eq(verificationToken.token, token));
    if (!verification_token.length) return null;
    return verification_token[0];
  } catch (error) {
    return null;
  }
};
