import { RouterProvider } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { AuthProvider } from './Context/auth';
import { router } from './Router/router';

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
