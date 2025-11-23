import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isLoginRoute = request.nextUrl.pathname === "/admin/login";

    if (isAdminRoute && !isLoginRoute) {
        const adminSession = request.cookies.get("admin_session");
        if (!adminSession) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
