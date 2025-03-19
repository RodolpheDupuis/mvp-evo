import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  pages: { signIn: "/login" },
});

// Protect routes that start with /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};