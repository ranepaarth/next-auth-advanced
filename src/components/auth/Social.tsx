'use client';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export function Social() {
  const handleLogin = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
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
  );
}
