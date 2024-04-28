import React from 'react';

interface EmailTemplateProps {
  verificationLink?: string;
  passwordResetLink?: string;
  twoFactorToken?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationLink,
  passwordResetLink,
  twoFactorToken,
}) => (
  <div>
    <h1>Next-auth V5</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere et,
      delectus cumque quisquam nam officia odit praesentium asperiores excepturi
      necessitatibus reiciendis vero, officiis perspiciatis tempora. Tempore
      modi, minus tenetur iste repellendus nihil.
    </p>
    {passwordResetLink && (
      <h3>
        <a href={passwordResetLink}>Reset</a> your password.
      </h3>
    )}
    {verificationLink && (
      <h3>
        <a href={verificationLink}>Verify</a> your email.
      </h3>
    )}
    {twoFactorToken && (
      <div>
        <p>Your two factor authentication code is:</p>
        <span>
          <h4>{twoFactorToken}</h4>
        </span>
      </div>
    )}
  </div>
);

export default EmailTemplate;
