import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { credentialsSchema } from "./lib/validations"
import { predefinedViews } from "./utils/predefined"
import authConfig from "./auth.config" // <--- Import the edge config

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig, // <--- Spread the edge config here
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    ...authConfig.providers, // <--- Merge Google from config
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
})