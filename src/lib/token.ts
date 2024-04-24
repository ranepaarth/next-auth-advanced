import { db } from '@/lib/db';
import { getResetTokenByEmail } from '@/utils/password-reset-token';
import { getVerificationTokenByEmail } from '@/utils/verfication-token';
import { v4 as uuid } from 'uuid';

export const generateResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 900 * 1000);

  /**
   * checks for already existing reset-password token in database
   * If token found then delete that token and create a new entry for the token using the email, token and expires
   */

  const existingToken = await getResetTokenByEmail(email);

  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  /**
   * checks for already existing verification token in database
   * If token found then delete that token and create a new entry for the token using the email, token and expires
   */

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
