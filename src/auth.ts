import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';
import { getUserById } from './utils/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
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
    signIn: async ({ user, account }) => {
      // For OAuth (login without email verification)
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id as string);

      // Prevent user from signing in with credentials if emailVerified field is null or false
      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA check
      return true;
    },
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
