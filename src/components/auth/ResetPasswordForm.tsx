'use client';

import { resetPasswordAction } from '@/actions/reset-password';
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
import { ResetPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function ResetPasswordForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() =>
      resetPasswordAction(values).then(data => {
        setError(data.error);
        setSuccess(data.success);
      }),
    );
  };

  return (
    <CardWrapper
      headerLabel='Forgot your password?'
      backButtonLabel={'Back to Login'}
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='placeholder@example.com'
                      type='email'
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <FormBtn isPending={isPending} text={'Get reset password email'} />
        </form>
      </Form>
    </CardWrapper>
  );
}
