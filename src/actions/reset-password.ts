'use server';

import { sendResetPasswordEmail } from '@/lib/mail';
import { generateResetToken } from '@/lib/token';
import { ResetPasswordSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';
import * as z from 'zod';

export const resetPasswordAction = async (
  values: z.infer<typeof ResetPasswordSchema>,
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid email provided!',
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: 'Email does not exist!',
    };
  }

  const resetPasswordToken = await generateResetToken(email);

  await sendResetPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token,
  ).catch(() => {
    return {
      error: 'There was an error sending the email!',
    };
  });

  return {
    success: 'We have sent you an email',
  };
};
