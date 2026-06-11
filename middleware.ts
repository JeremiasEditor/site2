import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Rotas protegidas
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token");

    if (!token) {
      // Redirecionar para login secreto
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
