'use client';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export function Social() {
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = (provider: 'google' | 'github') => {
    setLoading(true);
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
      .then(data => setLoading(false))
      .catch(error => console.log(error))
      .finally(() => setLoading(true));
  };

  return (
    <div className='flex w-full flex-col gap-y-2'>
      <div className='flex w-full items-center gap-x-2'>
        <Button
          size='lg'
          className='w-full'
          variant='outline'
          onClick={() => handleLogin('google')}
        >
          <FcGoogle className='h-5 w-5' />
        </Button>
        <Button
          size='lg'
          className='w-full'
          variant='outline'
          onClick={() => handleLogin('github')}
        >
          <FaGithub className='h-5 w-5' />
        </Button>
      </div>
      {loading && (
        <div className='flex items-center justify-center'>
          <Loader2 className='h-5 w-5 animate-spin text-slate-900' />
        </div>
      )}
    </div>
  );
}
