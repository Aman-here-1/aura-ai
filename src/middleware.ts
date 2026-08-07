// // src/middleware.ts

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("aura_token")?.value;

//   const { pathname } = request.nextUrl;

//   // ---------------------------------------
//   // Public Routes
//   // ---------------------------------------

//   const publicRoutes = [
//     "/login",
//     "/signup",
//   ];

//   // ---------------------------------------
//   // Already Logged In
//   // ---------------------------------------

//   if (
//     token &&
//     (pathname === "/login" || pathname === "/signup")
//   ) {
//     return NextResponse.redirect(
//       new URL("/", request.url)
//     );
//   }

//   // ---------------------------------------
//   // Protected Routes
//   // ---------------------------------------

//   if (
//     !token &&
//     !publicRoutes.includes(pathname)
//   ) {
//     return NextResponse.redirect(
//       new URL("/login", request.url)
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/dashboard/:path*",
//     "/reports/:path*",
//     "/chat/:path*",
//     "/upload/:path*",
//     "/settings/:path*",
//     "/profile/:path*",
//     "/login",
//     "/signup",
//   ],
// };


// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * -------------------------------------------------------
 * TEMPORARY MIDDLEWARE
 * -------------------------------------------------------
 * Authentication is temporarily disabled.
 * We'll enable JWT protection after login/signup
 * flow is fully working.
 * -------------------------------------------------------
 */

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};