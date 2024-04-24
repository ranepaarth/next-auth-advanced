'use server';

import { db } from '@/lib/db';
import { NewPasswordSchema } from '@/schemas';
import { getResetTokenByToken } from '@/utils/password-reset-token';
import { getUserByEmail } from '@/utils/user';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const newPasswordAction = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) => {
  if (!token) {
    return {
      error: 'Missing password reset token!',
    };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: 'Invalid password!',
    };
  }

  const { password } = validatedFields.data;

  const existingResetToken = await getResetTokenByToken(token);
  if (!existingResetToken) {
    return {
      error: 'Password reset link expired!',
    };
  }

  const hasExpired = new Date(existingResetToken.expires) < new Date();
  if (hasExpired) {
    return {
      error: 'Password reset link expired!',
    };
  }

  const existingUser = await getUserByEmail(existingResetToken.email);
  if (!existingUser) {
    return {
      error: 'Email does not exist!',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.resetPasswordToken.delete({
    where: {
      id: existingResetToken.id,
    },
  });

  return {
    success: 'Password reset successful!',
  };
};
