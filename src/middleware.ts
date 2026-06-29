import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin routes
  if (pathname.startsWith("/admin")) {
    // Allow access to login page
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for session cookie
    const session = request.cookies.get("admin_session");

    if (!session) {
      // Redirect to login if no session
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Validate session (simple check - in production, verify against database)
    const adminUsername = process.env.ADMIN_USERNAME;
    if (!adminUsername) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const decoded = Buffer.from(session.value, "base64").toString("utf-8");
      const [username] = decoded.split(":");

      if (username !== adminUsername) {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
