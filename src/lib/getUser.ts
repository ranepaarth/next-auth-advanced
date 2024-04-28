import { auth } from '@/auth';

const getUser = async () => {
  const session = await auth();
  return session?.user;
};

export default getUser;
