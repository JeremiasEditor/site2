import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Rotas protegidas - EXCLUIR /admin-login
  if (pathname.startsWith("/admin") && pathname !== "/admin-login") {
    const token = request.cookies.get("admin_token");

    if (!token) {
      // Redirecionar para login
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
