"use server";

import { users } from "@/lib/memory";

// Step 1: Generate OTP for email
export async function requestReset(email: string) {
  const user = users.get(email);
  if (!user) return { error: "User not found" };

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;

  console.log(`🔐 Password reset code for ${email}: ${otp}`);
  return { success: true };
}

// Step 2: Set new password if OTP is valid
export async function resetPassword(
  email: string,
  code: string,
  newPassword: string
) {
  const user = users.get(email);
  if (!user || user.otp !== code) return { error: "Invalid or expired code" };

  user.password = newPassword;
  user.otp = undefined; // clear OTP
  console.log(`✅ Password reset successful for ${email}`);
  return { success: true };
}
