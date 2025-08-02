import { sessions, users } from "@/lib/memory";

export async function POST(req: Request) {
  const token = req.headers.get("cookie")?.split("auth=")[1];
  const session = token ? sessions.get(token) : null;
  const user = session?.email ? users.get(session.email) : null;

  if (user) {
    user.name = (await req.json()).name;
    return Response.json({ message: "Name updated!" });
  }

  return Response.json({ message: "Unauthorized" }, { status: 401 });
}
