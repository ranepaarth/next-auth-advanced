import FallBack from '@/components/auth/FallBack';
import { LoginForm } from '@/components/auth/LoginForm';
import React, { Suspense } from 'react';

function LoginPage() {
  return (
    <Suspense fallback={<FallBack />}>
      <LoginForm />
    </Suspense>
  );
}

export default LoginPage;
