"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetTokens } from "@/lib/token";
import {
  ResetPasswordSchema,
  TNewPasswordSchema,
  TresetPasswordSchema,
} from "@/schema/auth.schema";
import { getUserByEmail } from "../../db/model/users";

export default async function resetPassword(values: TresetPasswordSchema) {
  try {
    const validatedFeilds = ResetPasswordSchema.safeParse(values);

    if (!validatedFeilds.success) {
      return { error: "Invalid email." };
    }

    const { email } = validatedFeilds.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email does not exists" };
    }

    const resetPasswordToken = await generatePasswordResetTokens(
      existingUser.id,
      email
    );

    if (!resetPasswordToken || resetPasswordToken.length === 0) {
      throw new Error("Someting went wrong.");
    }

    await sendPasswordResetEmail(email, resetPasswordToken[0].token);

    return { success: "Reset Email send..." };
  } catch (error) {
    return { error: "Oops! Someting went wrong." };
  }
}