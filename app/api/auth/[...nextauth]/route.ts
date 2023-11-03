import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Auth0Provider from "next-auth/providers/auth0";
import prisma from "@/prisma/client";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  session: {
    strategy: "jwt"
  }
});

export { handler as GET, handler as POST };
