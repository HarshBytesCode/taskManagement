import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
      
        if (!credentials?.email || !credentials?.password) {
          console.log("Email or password missing");
          return null;
        }
      
        const userExist = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
      
        if (!userExist) {
          console.log("User not found:", credentials.email);
          return null;
        }
        console.log(userExist, credentials);
        
      
        if (credentials.password != userExist.password) {
          console.log("Invalid password for user:", credentials.email);
          return null;
        }
      
        console.log("User authenticated successfully:", userExist);
        return {
          id: userExist.id,
          name: userExist.name,
          email: userExist.email,
        };
      }
    })
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ session, token }) {
      
      session.user = {
        ...session.user,
        id: token?.sub ?? '',
      };
      
      return session;
    },
    async jwt({ token, user }) {
      
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET

} satisfies NextAuthConfig;
