import getUser from '@/lib/getUser';
import React from 'react';
import UserInfo from '../_components/UserInfo';

const ServerPage = async () => {
  const user = await getUser();

  return <UserInfo user={user} label='Server Component' />;
};

export default ServerPage;
