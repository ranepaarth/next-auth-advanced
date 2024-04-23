'use server';

import { signIn } from '@/auth';
import { generateVerificationToken } from '@/lib/token';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export async function loginAction(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: 'Invalid fields!',
    };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return {
      error: 'Email does not exist!',
    };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    return {
      success: 'Confirmation email sent',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return {
      success: 'Fine!',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.name, error.type);
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid email or password',
          };
        case 'AccessDenied':
          return {
            error: 'Please verify your email!',
          };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
}
