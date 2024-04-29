import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

type ExtendedUser = DefaultSession['user'] & {
  id: string;
  role: UserRole;
  status: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};
declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
