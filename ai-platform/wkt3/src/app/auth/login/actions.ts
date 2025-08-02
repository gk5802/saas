"use server";

import { users,createToken } from "@/lib/memory";

export async function startLogin(email: string, password: string) {
  const user = users.get(email);
  if (!user) return { error: "User not found" };
  if (user.password !== password) return { error: "Invalid password" };

  // Generate 6-digit 2FA code
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;

  console.log(`2FA code for ${email}: ${otp}`); // Replace with email sending later
  return { success: true };
}

export async function verify2FA(email: string, code: string) {
  const user = users.get(email);
  if (!user || user.otp !== code) return { error: "Invalid code" };

  user.otp = undefined;
  const token = createToken(email);
  return { token };
}
