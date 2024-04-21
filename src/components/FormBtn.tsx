import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react';

type FormBtnProps = {
  isPending: boolean;
  text: string;
};

export function FormBtn({ isPending, text }: FormBtnProps) {
  return (
    <Button type='submit' className='w-full'>
      {isPending ? <Loader2 className='h-5 w-5 animate-spin' /> : text}
    </Button>
  );
}
