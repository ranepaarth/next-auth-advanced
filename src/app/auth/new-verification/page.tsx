import FallBack from '@/components/auth/FallBack';
import NewVerificationForm from '@/components/auth/NewVerificationForm';
import React, { Suspense } from 'react';

function NewVerification() {
  return (
    <Suspense fallback={<FallBack />}>
      <NewVerificationForm />
    </Suspense>
  );
}

export default NewVerification;
