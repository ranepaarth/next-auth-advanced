import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import Navbar from './_components/Navbar';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-50 to-neutral-700 p-8'>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </main>
  );
};

export default ProtectedLayout;
