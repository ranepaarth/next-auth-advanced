'use client';

import { newPasswordAction } from '@/actions/new-password';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { FormBtn } from '@/components/FormBtn';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('reset-token');

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() =>
      newPasswordAction(values, token).then(data => {
        setError(data.error);
        setSuccess(data.success);
      }),
    );
  };

  return (
    <CardWrapper
      headerLabel='Enter a new password'
      backButtonLabel={'Back to Login'}
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='******'
                      type='password'
                      autoFocus
                      disabled={isPending}
                      autoComplete='off'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <FormBtn isPending={isPending} text={'Reset Password'} />
        </form>
      </Form>
    </CardWrapper>
  );
}
