import { users } from "@/lib/memory";

export async function GET() {
  const list = [...users.entries()].map(([email, u]) => ({
    email,
    role: u.role,
    loginCount: u.loginCount || 0,
  }));
  return Response.json(list);
}
