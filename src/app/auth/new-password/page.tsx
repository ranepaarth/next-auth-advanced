import FallBack from '@/components/auth/FallBack';
import { NewPasswordForm } from '@/components/auth/NewPasswordForm';
import React, { Suspense } from 'react';

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
