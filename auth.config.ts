import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    Credentials({
      id: "signin-credentials",
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "m@example.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const res = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (res.ok) {
          const { data } = await res.json();

          if (!data || !data.id) {
            return null;
          }

          return { id: data.id, name: data.name, email: data.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
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
