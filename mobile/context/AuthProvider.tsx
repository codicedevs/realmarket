import React from 'react';
import Toast from 'react-native-root-toast';
import { useStorageState } from '../hooks/useStorageState';
import authService from '../service/auth.service';

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string | IUser | null;
  isLoading: boolean;
  checkSession: () => void
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  checkSession: () => null
});

// This hook can be used to access the user info.
export function useSession() {

  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}


export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const notification = (texto: string) => {
    Toast.show(texto, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          const data = await authService.login(username, password)
          if (data) {
            setSession(data.user);
            notification('Inicio de sesion exitoso')
          } else {
            notification('Error en el inicio de sesion')
          }
        },
        signOut: async () => {
          setSession(null);
          await authService.signOut()
          notification('Se cerro sesion')
        },
        session,
        isLoading,
        checkSession: async () => {
          const res = await authService.whoami()
          setSession(res.data)
        }
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}