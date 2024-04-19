'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export function Social() {
  return (
    <div className='flex w-full items-center gap-x-2'>
      <Button size='lg' className='w-full' variant='outline'>
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button size='lg' className='w-full' variant='outline'>
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
}
