import { getSession } from './lib/auth';
import AuthForm from './ui/AuthForm';

export default async function Home () {
  const session = await getSession();

  return (
    <>
      <h1>Basic Session Auth</h1>
      <AuthForm session={session}/>
    </>
  );
}
