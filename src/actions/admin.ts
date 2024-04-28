'use server';

import { getUserRole } from '@/lib/getUser';
import { UserRole } from '@prisma/client';

export const admin = async () => {
  const role = await getUserRole();

  if (role !== UserRole.ADMIN) {
    return {
      error: 'You are not ADMIN!',
    };
  }
  return {
    success: `${new Date().toLocaleDateString('en-US', {
      dateStyle: 'full',
    })}`,
  };
};
