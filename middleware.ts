import NextAuth from "next-auth";
import authConfig from "./auth.config"; // <--- Import the lightweight config
import { NextResponse } from "next/server";

// Initialize NextAuth with ONLY the lightweight config to generate the 'auth' helper
const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
    // Your existing matcher is fine
    matcher : ["/dashboard/:path*" , "/login" , "/register"]
}