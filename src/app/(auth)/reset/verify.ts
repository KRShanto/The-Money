"use server";

import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

// Verify the reset token
// If the token is valid, update the user's password
export async function verifyResetToken(
  resetToken: string,
  newPassword: string,
) {
  await dbConnect();

  const user = await User.findOne({ resetToken });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  if (user.resetTokenExpires! < Date.now()) {
    return {
      error: "Token expired",
    };
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  await user.save();

  return {
    success: true,
    email: user.email,
  };
}
