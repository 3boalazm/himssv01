import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const jar = await cookies()
  jar.delete("hlos_sid")
  return NextResponse.redirect(new URL("/login", request.url))
}
