export default function AuthForm ({
  isAuthenticated = false
}: Readonly<{
  isAuthenticated?: Boolean;
}>) {
  return isAuthenticated ? <Logout/> : <Login />;
}

function Login () {
  return (
    <form action="">
      <input type="email" placeholder="Enter your email" />
      <input type="submit" value="Login" />
    </form>
  );
}

function Logout () {
  return (
    <form action="">
      <input type="submit" value="Logout"/>
    </form>
  );
}
