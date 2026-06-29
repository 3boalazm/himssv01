import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const PROTECTED_ROUTES = ["/", "/team", "/analytics", "/tasks", "/calendar", "/settings", "/help"]
const AUTH_ROUTES = ["/login", "/register"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for session cookie (hlos_sid from NestJS backend)
  const session = request.cookies.get("hlos_sid")

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // Redirect unauthenticated users to login
  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}
