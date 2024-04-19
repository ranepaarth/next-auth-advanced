'uce client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

interface BackBtnProps {
  label: string;
  href: string;
}
export function BackBtn({ label, href }: BackBtnProps) {
  return (
    <Button variant='link' className='w-full font-normal' size='sm' asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
