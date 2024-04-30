'use client';

import { settingsAction } from '@/actions/settings';
import LogoutBtn from '@/components/auth/LogoutBtn';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useCurrentUser from '@/hooks/useCurrentUser';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import { Loader2, LogOutIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

function Settings() {
  const user = useCurrentUser();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue('name', user?.name as string);
      form.setValue('email', user?.email || undefined);
      form.setValue('role', user.role);
      form.setValue(
        'isTwoFactorEnabled',
        user?.isTwoFactorEnabled || undefined,
      );
    }

    if (user && user.role && user.role === UserRole.ADMIN) {
      form.setValue('role', 'ADMIN');
    }
    if (user && user.role && user.role === UserRole.USER) {
      form.setValue('role', 'USER');
    }
    console.log(form.getValues('role'));
  }, [user, form]);

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    console.log(values);
    startTransition(async () => {
      await settingsAction(values)
        .then(data => {
          if (!data.error && !data.success) {
            setError('');
            setSuccess('');
            return;
          }
          if (data.error) {
            setSuccess('');
            setError(data.error);
            return;
          }

          if (data.success) {
            update();
            setError('');
            setSuccess(data.success);
            return;
          }
        })
        .catch(() => setError('Something went wrong!'));
    });
  };
  return (
    <Card className='w-full max-w-[600px] rounded-lg bg-white p-8'>
      <CardHeader className='text-center text-2xl font-semibold'>
        <p>⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Example Name'
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user?.isOAuth && (
                <>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='example@email.com'
                            value={field.value}
                            type='email'
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='******'
                            type='password'
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between rounded-md border p-3 shadow-sm'>
                      <div>
                        <FormLabel>Role</FormLabel>
                        <FormDescription>
                          Select a role for yourself
                        </FormDescription>
                      </div>
                      <div className='w-2/5'>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={field.value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UserRole.ADMIN}>
                              ADMIN
                            </SelectItem>
                            <SelectItem value={UserRole.USER}>USER</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user?.isOAuth && (
                <FormField
                  control={form.control}
                  name='isTwoFactorEnabled'
                  render={({ field }) => (
                    <FormItem className='flex items-start justify-between rounded-md border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className='flex items-center justify-between'>
              <Button
                disabled={isPending}
                type='submit'
                size={'sm'}
                className='w-32'
                onClick={form.handleSubmit(onSubmit)}
              >
                {isPending ? (
                  <Loader2 className='h-5 w-5 animate-spin' />
                ) : (
                  'Update Settings'
                )}
              </Button>
              <div
                className='hove rounded-md bg-red-500 text-sm 
              text-white hover:bg-red-600'
              >
                <LogoutBtn>
                  <div className='flex h-9 items-center rounded-md px-3'>
                    <LogOutIcon className='mr-2 h-4 w-4' strokeWidth={2.5} />
                    <span>Logout</span>
                  </div>
                </LogoutBtn>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <FormError message={error} />
      <FormSuccess message={success} />
    </Card>
  );
}

export default Settings;
