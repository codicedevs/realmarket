import React from 'react';
import { useStorageState } from '../hooks/useStorageState';
import authService from '../service/auth.service';

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string |IUser | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
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

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          const data = await authService.login(username, password)
          if(data){
            setSession(data.user);
          }
        },
        signOut: async () => {
          setSession(null);
          await authService.signOut()
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}