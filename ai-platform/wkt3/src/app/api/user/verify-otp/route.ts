import { users, sessions } from "@/lib/memory";

export async function POST(req: Request) {
  const { otp } = await req.json();
  let email = null;

  for (const [e, u] of users.entries()) {
    if (u.otp === otp) {
      email = e;
      u.password = u.newPassword;
      delete u.otp;
      delete u.newPassword;

      const newToken = Math.random().toString(36).substring(2);
      sessions.set(newToken, { email });
      return new Response(null, {
        status: 302,
        headers: {
          "Set-Cookie": `auth=${newToken}; Path=/; HttpOnly`,
          Location: "/dashboard/user",
        },
      });
    }
  }

  return Response.json({ success: false, message: "Invalid OTP" });
}
