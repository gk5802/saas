import { NextRequest, NextResponse } from "next/server";
import { isValidToken, sessions, users } from "./lib/memory";

const PUBLIC_PATHS = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot",
  "/logout",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth")?.value;

  if (!token || !isValidToken(token)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Add inside middleware.ts below isValidToken check
  const email = sessions.get(token)?.email;
  const user = email ? users.get(email) : null;

  if (
    pathname.startsWith("/dashboard/superadmin") &&
    user?.role !== "superadmin"
  ) {
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }
  if (pathname.startsWith("/dashboard/admin") && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/logout"],
};
