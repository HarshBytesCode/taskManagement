import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const token = request.cookies.get("authjs.session-token")?.value ?? request.cookies.get("__Secure-authjs.session-token")?.value;

    const publicPaths = path === "/signup" || "/auth/signin";
    if(!token || !publicPaths) {
        const url = new URL("/signup", request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
    
}

export const config = {
    matcher: [
      "/",
      "/profile/:path*",
      "/project/:path*",
    ],
  };
