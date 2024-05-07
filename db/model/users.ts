import { eq } from "drizzle-orm";

import { users } from "../schema";
import db from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length === 0) return null;
    return user[0];
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) return null;
    return user[0];
  } catch (error) {
    return null;
  }
};

export const updateUserEmailStatus = async (id: string) => {
  try {
    const user = await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user ?? null;
  } catch {
    return null;
  }
};
