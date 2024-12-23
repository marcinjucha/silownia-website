import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    // "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
    // Optional: Add specific app paths if you want to limit it further
    "/api",
    "/",
    "/kup-karnet",
    "/oferta",
  ],
}

export function middleware(request: NextRequest) {
  const isProd = process.env.NODE_ENV === "production"
  const path = request.nextUrl.pathname
  if (!isProd || path.startsWith("/regulamin") || path.startsWith("/polityka-prywatnosci")) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/regulamin", request.url))
}
