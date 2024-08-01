import React from 'react';
import { useStorageState } from '../hooks/useStorageState';
import authService from '../service/auth.service';
import { notification } from '../utils/notification';

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string | IUser | null;
  loadingScreen: boolean;
  checkSession: () => Promise<boolean>
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  loadingScreen: false,
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
  const [[loadingScreen, session], setSession] = useStorageState('session');

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
        loadingScreen,
        checkSession: async () => {
          try {
            const res = await authService.whoami()
            setSession(res.data)
            return !!res
          } catch (e) {
            return false
          }
        }
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}