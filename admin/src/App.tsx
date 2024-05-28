import { RouterProvider } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/auth';
import { router } from './Router/router';
7

const LoginButton = () => {
  const { login } = useAuth();

  return <button onClick={login}>Login</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please login.</div>;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <LogoutButton />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
