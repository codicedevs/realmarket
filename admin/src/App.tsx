import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/auth';
import { router } from './Router/router';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
