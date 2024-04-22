import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  events: {
    async createUser(message) {
      const { id: userId, email, name } = message.user;

      if (!userId || !email) return;

      const stripeCustomer = await stripe.customers.create({
        email,
        name: name ?? undefined,
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
    },
    async signIn(session) {
      const currUser = session.user;

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      if (!user) {
        return;
      }

      session.user = {
        ...currUser,
        ...user,
      };
    },
    async signOut(message: any) {
      const userId = message.session.userId;

      if (!userId) return;

      await prisma.session.deleteMany({
        where: {
          userId,
        },
      });
    },
  },
});
