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
    // Credentials({
    //   id: "signin-credentials",
    //   name: "Sign in with Email",
    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "m@example.com" },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "••••••••",
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     if (!credentials?.email || !credentials?.password) {
    //       return new Error("Email and password are required");
    //     }
    //     try {
    //       const res = await fetch(`${process.env.API_URL}/login`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //           email: credentials.email,
    //           password: credentials.password,
    //         }),
    //       });

    //       if (res.ok) {
    //         const { data } = await res.json();

    //         if (!data || !data.id) {
    //           return new Error("Invalid credentials");
    //         }

    //         console.log(data);

    //         return { id: data.id, name: data.name, email: data.email };
    //       }
    //       const errorData = await res.json();
    //       console.error("Login error:", errorData);
    //       if (errorData.error) {
    //         return new Error(errorData.error);
    //       }
    //       return new Error("Failed to log in");
    //     } catch (error) {
    //       console.error("Error during login:", error);
    //       if (error instanceof Error) {
    //         return new Error(error.message);
    //       }
    //     }
    //     return null; // Return null if no user found
    //   },
    // }),
  ],
  session: {
    strategy: "database",
  },
  adapter: MongoDBAdapter(client),
  secret: process.env.AUTH_SECRET || "",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (user) session.user.id = user.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
  // debug: true,
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
