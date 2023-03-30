import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {verifyToken} from "@/lib/utils";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const PUBLIC_FILE = /\.(.*)$/;
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || '';
  const {pathname} = req.nextUrl;

  const userId = await verifyToken(token);

  if (
    token && userId ||
    pathname.startsWith('/login') ||
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', req.url));
}
