'use client';

import { admin } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

const ServerActionBtn = () => {
  const [isPending, startTransition] = useTransition();
  const handleServerAction = () => {
    startTransition(
      async () =>
        await admin().then(data => {
          if (data.error) {
            toast.error('Server Action', { description: data.error });
          }
          if (data.success) {
            toast.success('Server Action', { description: data.success });
          }
        }),
    );
  };
  return (
    <Button onClick={handleServerAction} disabled={isPending} size={"sm"}>
      {isPending ? (
        <Loader2 className='h-5 w-5 animate-spin' />
      ) : (
        'Click to test'
      )}
    </Button>
  );
};

export default ServerActionBtn;
