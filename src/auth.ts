import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/utils/tow-factor-confirmation';
import { getUserById } from '@/utils/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';
import { getAccountById } from './utils/account';

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

      // Done: Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        // Done: Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

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
      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        // attach isOAuth property on session to display different settings for user logged via OAuth providers
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const user = await getUserById(token.sub as string);
      if (!user) return token;
      const existingAccount = await getAccountById(user.id);

      token.role = user.role;
      token.name = user.name;
      token.email = user.email;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
