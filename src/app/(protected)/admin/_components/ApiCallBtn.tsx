'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ApiCallBtn = () => {
  const [success, setSuccess] = useState<boolean>();
  const handleApiCall = async () => {
    const response = await fetch('/api/admin');

    const result = await response.json();
    if (!response.ok) {
      console.log(result.message);
      setSuccess(false);
      toast.error('API Button call', {
        description: `You are not ADMIN!`,
      });
    } else {
      toast.success('API Button call', {
        description: `${new Date().toLocaleDateString('en-US', {
          dateStyle: 'full',
        })}`,
      });
      setSuccess(true);
    }
  };

  return (
    <Button onClick={handleApiCall} variant={success ? 'default' : 'secondary'}>
      Click to test
    </Button>
  );
};

export default ApiCallBtn;
