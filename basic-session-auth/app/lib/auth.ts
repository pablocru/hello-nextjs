'use server';

import { cookies } from 'next/headers';
import { decrypt, encrypt } from './jwt';
import dayjs from 'dayjs';

export async function getSession () {
  const session = cookies().get('session')?.value;

  if (!session) return;

  return await decrypt(session);
}

export async function login (formData: FormData) {
  const encryptedUser = await encrypt({ email: formData.get('email') });

  cookies().set('session', encryptedUser, {
    expires: dayjs().add(10, 'seconds').unix(),
    httpOnly: true
  });
}

export async function logout () {
  cookies().set('session', '', {
    expires: dayjs().unix(),
    httpOnly: true
  });
}
