import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute = ["/", "/login"].includes(nextUrl.pathname);
      
      if (!isLoggedIn && !isPublicRoute) {
        return false; // Redirect to login
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
