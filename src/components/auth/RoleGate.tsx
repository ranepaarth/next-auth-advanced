'use server';
import { getUserRole } from '@/lib/getUser';
import { UserRole } from '@prisma/client';
import React, { ReactNode } from 'react';
import { FormError } from '../FormError';
import { FormSuccess } from '../FormSuccess';

interface RoleGateProps {
  allowedRole: UserRole;
}

const RoleGate = async ({ allowedRole }: RoleGateProps) => {
  const role = await getUserRole();
  if (role !== allowedRole) {
    return (
      <FormError message={`You don't have permission to view this content!`} />
    );
  }
  return <FormSuccess message={`You can view this content!`} />;
};

export default RoleGate;
