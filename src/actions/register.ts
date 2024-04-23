'use server';

import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/token';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export async function registerAction(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: 'Invalid fields!',
    };

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: 'Email already exist',
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification TOKEN email
  const verificationToken = await generateVerificationToken(email);

  return {
    success: 'Confirmation email sent!',
  };
}
