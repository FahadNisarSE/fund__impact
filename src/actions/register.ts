"use server";

import { hash } from "bcryptjs";

import db from "@/lib/db";
import { getUserByEmail } from "../../db/model/users";
import { TUserSignUpSchema, userSignUpSchema } from "@/schema/auth.schema";
import { users } from "../../db/schema";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: TUserSignUpSchema) => {
  const validatedFeilds = userSignUpSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid feilds." };
  }

  const { email, name, password, userRole } = validatedFeilds.data;
  const hashedPassword = await hash(password, 10);

  console.log("feilds: ", { email, name, password, userRole });

  const exisitingUser = await getUserByEmail(email);

  if (exisitingUser) {
    return { error: "Email already in use." };
  }

  const user = await db
    .insert(users)
    .values({
      email,
      name,
      password: hashedPassword,
      userRole,
    })
    .returning();

  const verificationToken = await generateVerificationToken(user[0].id, email);
  if (verificationToken)
    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token
    );

  return { success: "Verification email has been sent to you email." };
};
