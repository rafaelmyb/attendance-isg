import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    try {
      return new PrismaClient({
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
        datasources: {
          db: {
            url: process.env.POSTGRES_URL,
          },
        },
      });
    } catch (error) {
      console.error("Failed to initialize Prisma client:", error);
      // Return a mock client for build-time
      return {} as PrismaClient;
    }
  })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
