// source: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?database-method=sql&language=ts#login-and-signup-form

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signIn (formData: FormData) {
  await authManager(formData, 'signIn');
}

export async function signUp (formData: FormData) {
  await authManager(formData, 'signUp');
}

async function authManager (formData: FormData, type: 'signIn' | 'signUp') {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = type === 'signIn'
    ? await supabase.auth.signInWithPassword(data)
    : await supabase.auth.signUp(data);

  if (error) throw error;

  revalidatePath('/', 'layout');
  redirect('/account');
}
