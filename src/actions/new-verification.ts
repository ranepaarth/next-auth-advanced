'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';
import { getVerificationTokenByToken } from '@/utils/verfication-token';

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: 'Token does not exist!',
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: 'Token has expired',
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: 'Email does not exist!',
    };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      //  for reusability when updating the email.

      // So when user updates the email, it gets stored in the verificationToken model and a verification link is sent on to the new updated email.

      // And then we would extract the email from the verificationToken object and update the user email.
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: 'Email verified successfully!',
  };
};
