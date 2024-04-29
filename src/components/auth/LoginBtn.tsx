'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LoginBtnProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

function LoginBtn({ children, mode = 'redirect', asChild }: LoginBtnProps) {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='w-auto border-none bg-transparent p-0'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
}

export default LoginBtn;
