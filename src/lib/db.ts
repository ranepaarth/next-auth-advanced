import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// For Development

// NextJs performs hot reload on saving a file
// And on each save it will create a new PrismaClient and will throw a warning that "too many prisma clients"
export const db = globalThis.prisma || new PrismaClient();

// Therefore if the environment is development then it will store the db variable inside the globalThis.prisma and whenever NextJs performs hot reload, it will check if it has initialized prisma already in the globalThis, its going to use that else will initialize with a new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// We have chosen globalThis is because it remains unaffected bt the hot reload

// For production
// export const db = new PrismaClient()
