import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Added by DispatchSEO: /blog and everything under it is served by your
// hosted blog, under your own domain. Remove this file to take it back.
const BLOG = "https://dispatchseo.com/hosted/NRN85zjq6Qo/blog";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const rest = pathname === "/blog" ? "" : pathname.slice("/blog".length);
  return NextResponse.rewrite(new URL(`${BLOG}${rest}${search}`));
}

export const config = { matcher: ["/blog", "/blog/:path*"] };
