'use client';

import { logoutAction } from '@/actions/logout';
import React, { ReactNode } from 'react';

interface LogoutButtonProps {
  children: ReactNode;
}

function LogoutBtn({ children }: LogoutButtonProps) {
  const handleLogout = async () => {
    logoutAction();
  };

  return (
    <button onClick={handleLogout} type='button' className='w-full'>
      {children}
    </button>
  );
}

export default LogoutBtn;
