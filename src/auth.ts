import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';
import { getUserById } from './utils/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (!token.sub || !session.user) return session;
      if (token.sub && session.user) {
        session.user.id = token.sub as string;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const user = await getUserById(token.sub as string);
      if (!user) return token;
      token.role = user.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
