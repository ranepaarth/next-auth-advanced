import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ExtendedUser } from '@/types';
import React from 'react';

interface UserInfoProps {
  user: ExtendedUser | undefined;
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className='w-full max-w-[600px]'>
      <CardHeader>
        <p className='text-center text-2xl font-semibold'>{label}</p>
      </CardHeader>

      <CardContent className='flex flex-col gap-y-2'>
        <div className='flex flex-row items-center justify-between rounded-md p-3 shadow-md'>
          <p className='text-sm font-medium'>ID</p>
          <p className='max-w-[180px] truncate rounded-md bg-slate-100 p-1 px-2.5 py-0.5 text-xs font-medium'>
            {user?.id}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-md p-3 shadow-md'>
          <p className='text-sm font-medium'>Name</p>
          <p className='max-w-[180px] truncate rounded-md bg-slate-100 p-1 px-2.5 py-0.5 text-xs font-medium'>
            {user?.name}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-md p-3 shadow-md'>
          <p className='text-sm font-medium'>Email</p>
          <p className='max-w-[180px] truncate rounded-md bg-slate-100 p-1 px-2.5 py-0.5 text-xs font-medium'>
            {user?.email}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-md p-3 shadow-md'>
          <p className='text-sm font-medium'>Role</p>
          <p className='max-w-[180px] truncate rounded-md bg-slate-100 p-1 px-2.5 py-0.5 text-xs font-medium'>
            {user?.role}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-md p-3 shadow-md'>
          <p className='text-sm font-medium'>Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
