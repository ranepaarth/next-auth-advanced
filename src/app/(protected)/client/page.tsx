'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import React from 'react';
import UserInfo from '../_components/UserInfo';

const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfo user={user} label='Client Component' />;
};

export default ClientPage;
