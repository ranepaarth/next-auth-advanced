'use client';

import LogoutBtn from '@/components/auth/LogoutBtn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useCurrentUser from '@/hooks/useCurrentUser';
import { LogOut } from 'lucide-react';
import React from 'react';
import { FaUser } from 'react-icons/fa';

const UserButton = () => {
  const user = useCurrentUser();
  console.log(user?.image);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='border border-input bg-white hover:bg-secondary'>
            <FaUser className='text-slate-900' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <LogoutBtn>
          <DropdownMenuItem className='flex items-center justify-between'>
            Logout
            <LogOut className='h-4 w-4' />
          </DropdownMenuItem>
        </LogoutBtn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
