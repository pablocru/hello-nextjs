// source: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?database-method=sql&language=ts#login-and-signup-form

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { processUserData } from './process-user-data';

export async function signIn (formData: FormData) {
  await authManager(formData, 'signIn');
}

export async function signUp (formData: FormData) {
  await authManager(formData, 'signUp');
}

async function authManager (formData: FormData, type: 'signIn' | 'signUp') {
  const supabase = createClient();

  const userData = processUserData(formData);

  const { error } = type === 'signIn'
    ? await supabase.auth.signInWithPassword(userData)
    : await supabase.auth.signUp(userData);

  if (error) throw error;

  revalidatePath('/', 'layout');
  redirect('/account');
}
