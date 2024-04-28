import RoleGate from '@/components/auth/RoleGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import React from 'react';
import ApiCallBtn from './_components/ApiCallBtn';
import ServerActionBtn from './_components/ServerActionBtn';

const AdminPage = () => {
  return (
    <Card className='w-full max-w-[600px]'>
      <CardHeader className='text-center text-xl font-semibold'>
        🔑Admin
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN} />
        <div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin only API route</p>
          <ApiCallBtn />
        </div>
        <div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin only Server Action</p>
          <ServerActionBtn />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
