import { NextAuthRequest } from "next-auth";

declare module "next-auth" {
  interface NextAuthRequest {
    nextUrl: URL;
  }
}
