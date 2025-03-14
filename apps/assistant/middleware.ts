import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge"
import { NextRequest, NextResponse } from "next/server"

export default withMiddlewareAuthRequired(async (request: NextRequest) => {
  // allowed routes
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next()
  }

  return NextResponse.next()
})

export const config = {
  // protected routes
  matcher: ["/api/:path*"],
}
