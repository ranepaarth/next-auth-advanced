'use server';

import { db } from '@/lib/db';
import { getUser } from '@/lib/getUser';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/token';
import { SettingsSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/utils/user';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const settingsAction = async (
  values: z.infer<typeof SettingsSchema>,
) => {
  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    };
  }

  const user = await getUser();
  if (!user) {
    return {
      error: 'Unauthorized!',
    };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return {
      error: 'Unauthorized!',
    };
  }

  const { name, email, password, newPassword, role, isTwoFactorEnabled } =
    validatedFields.data;

  if (user.isOAuth) {
    // Below fields are undefined so as to not modify if the user is logged in using OAuth providers
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (email && email !== user.email) {
    const existingUser = await getUserByEmail(email);

    if (existingUser && existingUser.id !== user.id) {
      return {
        error: 'Email already exists!',
      };
    }

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return {
      success: 'Verification email sent!',
    };
  }

  if (password && newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(password, dbUser.password);

    if (!passwordsMatch) {
      return {
        error: 'Incorrect password',
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return {
    success: 'Settings modified successfully!',
  };
};
