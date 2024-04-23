import React from 'react';

interface EmailTemplateProps {
  verificationLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationLink,
}) => (
  <div>
    <h1>Next-auth V5</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum maxime,
      perferendis tempora deserunt eos facere consectetur consequuntur quae
      rerum similique.
    </p>
    <p>
      <a href={verificationLink}>Verify</a> your email.
    </p>
  </div>
);

export default EmailTemplate;
