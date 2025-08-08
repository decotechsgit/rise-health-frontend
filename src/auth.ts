import { UnstorageAdapter } from "@auth/unstorage-adapter";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";

import { authService } from "./services/api/auth.service";
import { ApplicationHTTPError } from "./services/api/client.error";

const storage = createStorage({ driver: memoryDriver() });

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google" && account.id_token) {
        const loggedInUser = await authService.loginGoogle(account.id_token);

        user.email = loggedInUser.email;
        user.token = loggedInUser.accessToken;
        user.role = loggedInUser.id;
      }
      return true;
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/") return !!auth;
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.role = token.role as string;
        session.user.token = token.token as string;
      } else {
        session.user.role = user?.role as string;
        session.user.token = user?.token as string;
      }
      return session;
    },
  },
  adapter: UnstorageAdapter(storage),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365,
  },
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        if (
          typeof credentials.username !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credential format");
        }

        try {
          const result = await authService.login({
            email: credentials.username,
            password: credentials.password,
          });

          if (typeof result === "string") {
            throw new Error(result);
          }

          if (typeof result === "boolean") {
            if (result) {
              throw new Error("Login successful but no user data returned");
            } else {
              throw new Error("Invalid credentials");
            }
          }

          const user = result;

          if (!user || !user.email) {
            throw new Error("Invalid credentials.");
          }

          return {
            email: user.email,
            token: user.accessToken,
            role: user.id,
          };
        } catch (error) {
          if (error instanceof ApplicationHTTPError) {
            throw new Error(error.getUserMessage() || "Authentication failed");
          }
          throw error;
        }
      },
    }),
  ],
});
