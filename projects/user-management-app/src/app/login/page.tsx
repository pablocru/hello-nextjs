// source: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?database-method=sql&language=ts#login-and-signup-form

import { signIn, signUp } from './action';

export default function AuthForm () {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={signIn}>Log in</button>
      <button formAction={signUp}>Sign up</button>
    </form>
  );
}
