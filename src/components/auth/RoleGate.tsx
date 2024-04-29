'use client';

import useCurrentUserRole from '@/hooks/useCurrentUserRole';
import { UserRole } from '@prisma/client';
import React, { ReactNode } from 'react';
import { FormError } from '../FormError';

interface RoleGateProps {
  children: ReactNode;
  allowedRole: UserRole;
}

const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentUserRole();

  if (role !== allowedRole) {
    return (
      <FormError message={`You don't have permission to view this content!`} />
    );
  }

  return <>{children}</>;
};

export default RoleGate;
