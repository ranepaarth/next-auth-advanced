'use server';

import { signIn } from '@/auth';
import { db } from '@/lib/db';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { getTwoFactorConfirmationByUserId } from '@/utils/tow-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/utils/two-factor-token';
import { getUserByEmail } from '@/utils/user';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export async function loginAction(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: 'Invalid fields!',
    };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: 'Email does not exist!',
    };
  }

  const existingUserId = existingUser.id;
  const existingUserEmail = existingUser.email;
  const existingUserPassword = existingUser.password;
  const isEmailVerified = existingUser.emailVerified;
  const isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

  if (!existingUserEmail || !existingUserPassword)
    return {
      error: 'Email does not exist!',
    };

  if (!(await bcrypt.compare(password, existingUserPassword))) {
    return {
      error: 'Invalid Password!',
    };
  }

  if (!isEmailVerified) {
    const verificationToken =
      await generateVerificationToken(existingUserEmail);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: 'Confirmation email sent',
    };
  }

  if (isTwoFactorEnabled && existingUserEmail) {
    if (code) {
      // Done: Verify OTP code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUserEmail);
      if (!twoFactorToken || twoFactorToken.token !== code)
        return {
          error: 'Invalid Authentication code!',
        };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return {
          error: 'Authentication code expired!',
        };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation =
        await getTwoFactorConfirmationByUserId(existingUserId);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUserId,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUserEmail);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        twoFactor: true,
      };
    }
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
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
}
