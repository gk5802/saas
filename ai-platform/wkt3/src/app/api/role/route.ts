import { sessions, users } from "@/lib/memory";

export async function POST(req: Request) {
  const { token } = await req.json();
  const session = sessions.get(token);
  const email = session?.email;
  const user = email ? users.get(email) : null;

  if (!user) {
    return Response.json({ role: "user" });
  }

  return Response.json({ role: user.role || "user" });
}
