// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "@/app/[locale]/lib/firebaseAdmin";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { syncUserWithDatabase } from "@/app/[locale]/lib/userSync";

const prisma = new PrismaClient();

// Extend the built-in Session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email) {
            throw new Error("Email is required");
          }
          const userRecord = await auth.getUserByEmail(credentials.email);
          if (!userRecord) throw new Error("User not found");
          
          // Sync the Firebase user with our Prisma database
          // Convert undefined to null to match the function signature
          await syncUserWithDatabase(userRecord.uid, userRecord.email || null);
          
          return { id: userRecord.uid, email: userRecord.email };
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" as const },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };