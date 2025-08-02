import { sessions, users } from "@/lib/memory";

export async function POST(req: Request) {
  const token = req.headers.get("cookie")?.split("auth=")[1];
  const session = token ? sessions.get(token) : null;
  const email = session?.email;
  const user = email ? users.get(email) : null;
  const { current, newPass } = await req.json();

  if (!user || user.password !== current) {
    return Response.json({ message: "Incorrect current password" });
  }

  if (
    !newPass.match(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*#?&]{6,}$/
    )
  ) {
    return Response.json({ message: "New password is weak" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.newPassword = newPass;

  sessions.delete("token"); // Logout immediately
  return Response.json({ message: "OTP sent to new password", otpSent: true });
}
