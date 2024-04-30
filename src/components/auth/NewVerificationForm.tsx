'use client';
import { verifyToken } from '@/actions/new-verification';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    console.log(searchParams.get('token'));
    if (!token) {
      setError('Missing Token');
      return;
    }

    verifyToken(token)
      .then(data => {
        console.log(data);
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [searchParams,token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel='Confirm Verification'
      backButtonHref='/auth/login'
      backButtonLabel='Back to Login'
    >
      <div className='flex w-full flex-col items-center justify-center gap-y-4'>
        {!error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}

export default NewVerificationForm;
