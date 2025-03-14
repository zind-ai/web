import { NextRequest, NextResponse } from "next/server"
import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge"

export default withMiddlewareAuthRequired(async (request: NextRequest) => {
  // allowed routes
  if (["/auth/login", "/auth/callback"].includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const res = NextResponse.next()

  const session = await getSession(request, res)
  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return res
})

export const config = {
  // protected routes
  matcher: ["/((?!auth|_next|assets).*)"],
}
