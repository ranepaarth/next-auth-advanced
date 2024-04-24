import { db } from '@/lib/db';

export const getResetTokenByEmail = async (email: string) => {
  try {
    const ResetToken = await db.resetPasswordToken.findUnique({
      where: {
        email,
      },
    });
    return ResetToken;
  } catch (error) {
    return null;
  }
};

export const getResetTokenByToken = async (token: string) => {
  try {
    const ResetToken = await db.resetPasswordToken.findUnique({
      where: {
        token,
      },
    });
    return ResetToken;
  } catch (error) {
    return null;
  }
};
