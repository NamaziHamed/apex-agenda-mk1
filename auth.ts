import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
import { credentialsSchema } from "./lib/validations";
import { predefinedViews } from "./utils/predefined";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {},
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) return null;
          const isPasswordValid = await bcrypt.compare(
            password,
            user.password as string
          );

          if (!isPasswordValid) return null;
          return { id: user.id, name: user.name, email: user.email };
        } catch (error) {
          console.error("Authorization Error", error);
          return null;
        }
      },
    }),
  ],
  events: {
    async createUser(message) {
      const categoriesToCreate = predefinedViews.map((item) => ({
        title: item.title,
        icon: item.icon,
        userId: message.user.id!,
      }));
      await prisma.category.createMany({
        data: categoriesToCreate,
      });
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
