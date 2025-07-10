import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  adapter: MongoDBAdapter(client),
  secret: process.env.AUTH_SECRET || "",
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: "nyayamitra.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
    callbackUrl: {
      name: "nyayamitra.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
    csrfToken: {
      name: "nyayamitra.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
    pkceCodeVerifier: {
      name: "nyayamitra.pkce-code-verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
});
