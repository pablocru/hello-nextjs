import { JWTPayload } from 'jose';
import { login, logout } from '../lib/auth';

export default function AuthForm ({
  session
}: Readonly<{
  session?: JWTPayload;
}>) {
  return (
    <>
      {!session && <Login/>}
      {session && <Logout/>}
    </>
  );
}

function Login () {
  return (
    <form action={login}>
      <input type="email" name='email' placeholder="Enter your email" />
      <input type="submit" name='login' value="Login" />
    </form>
  );
}

function Logout () {
  return (
    <form action={logout}>
      <input type="submit" name='logout' value="Logout"/>
    </form>
  );
}
