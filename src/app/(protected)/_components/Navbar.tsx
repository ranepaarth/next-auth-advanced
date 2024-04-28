'use client';

import UserButton from '@/components/auth/UserButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className='flex w-full max-w-[600px] items-center justify-between rounded-lg bg-secondary p-2 shadow-sm'>
      <div className='flex gap-x-2'>
        <Button
          asChild
          variant={pathname === '/server' ? 'default' : 'outline'}
          size={'sm'}
          className='text-xs sm:text-sm'
        >
          <Link href={'/server'}>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/client' ? 'default' : 'outline'}
          size={'sm'}
          className='text-xs sm:text-sm'
        >
          <Link href={'/client'}>Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/admin' ? 'default' : 'outline'}
          size={'sm'}
          className='text-xs sm:text-sm'
        >
          <Link href={'/admin'}>Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/settings' ? 'default' : 'outline'}
          size={'sm'}
          className='text-xs sm:text-sm'
        >
          <Link href={'/settings'}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
