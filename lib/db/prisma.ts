import { PrismaClient, User } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export const isAbleToCUD = async (userId: User["id"]) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user?.plan === "Guest" || user?.plan === "None") {
    return { result: false, user };
  }

  return { result: true, user };
};

export const findUserFromCustomer = async (stripeCustomerId: string) => {
  if (!stripeCustomerId) return null;

  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId,
    },
  });
  return user;
};
