import { users } from "@/lib/memory";

export async function POST(req: Request) {
  const { email, role } = await req.json();
  const user = users.get(email);
  if (user) {
    user.role = role;
    return Response.json({ success: true });
  }
  return Response.json({ success: false });
}
