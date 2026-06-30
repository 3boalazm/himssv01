import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_ROUTES = [
  "/",
  "/team", "/analytics", "/tasks", "/calendar", "/settings", "/help",
  "/org", "/admin",
]
const AUTH_ROUTES = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get("hlos_sid")

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/org/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}
