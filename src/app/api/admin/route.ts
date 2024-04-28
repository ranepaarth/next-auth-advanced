import { getUserRole } from '@/lib/getUser';
import { UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const role = await getUserRole();

  if (role === UserRole.ADMIN) {
    return NextResponse.json({ message: 'OKAY' }, { status: 200 });
  }

  return NextResponse.json({ message: 'FORBIDDEN' }, { status: 403 });
}
