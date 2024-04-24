import React from 'react';

interface EmailTemplateProps {
  verificationLink: string;
  isPasswordResetEmail: boolean;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationLink,
  isPasswordResetEmail,
}) => (
  <div>
    <h1>Next-auth V5</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere et,
      delectus cumque quisquam nam officia odit praesentium asperiores excepturi
      necessitatibus reiciendis vero, officiis perspiciatis tempora. Tempore
      modi, minus tenetur iste repellendus nihil.
    </p>
    {isPasswordResetEmail ? (
      <h3>
        <a href={verificationLink}>Reset</a> your password.
      </h3>
    ) : (
      <h3>
        <a href={verificationLink}>Verify</a> your email.
      </h3>
    )}
  </div>
);

export default EmailTemplate;
