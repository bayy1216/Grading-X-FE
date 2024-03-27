import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
    };
    backendJwt: {
      accessToken: string;
      refreshToken: string;
    }
  }
}