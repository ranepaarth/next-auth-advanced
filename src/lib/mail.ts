import EmailTemplate from '@/components/auth/EmailTemplate';
import { ReactElement } from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'Paarth-Rane <onboarding@resend.dev>',
    to: email,
    subject: 'Next-auth V5: Verification Email',
    react: EmailTemplate({
      verificationLink: confirmationLink,
    }) as ReactElement,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const passwordResetLink = `http://localhost:3000/auth/new-password?reset-token=${token}`;

  await resend.emails.send({
    from: 'Paarth-Rane <onboarding@resend.dev>',
    to: email,
    subject: 'Next-auth V5: Password Reset',
    react: EmailTemplate({
      passwordResetLink,
    }) as ReactElement,
  });
};
