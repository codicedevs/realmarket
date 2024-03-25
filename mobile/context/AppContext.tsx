import React, { createContext, FC, ReactNode, useState } from "react";

interface AppContextProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

const initialContext: AppContextProps = {
  currency: null,
  setCurrency: () => 'ARS',
};

export const AppContext = createContext<AppContextProps>(initialContext);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('ARS')
  // const findUser = () => {
  //     try {
  //         const user = localStorage.getItem("currentUser")
  //         if (!user) return
  //         setCurrentUser(JSON.parse(user))
  //     } catch (err) {
  //         console.error(err)
  //     } finally {
  //         setTimeout(() => {
  //             setLoading(false)
  //         }, 2000)
  //     }
  // 
  // useEffect(() => {
  //     findUser()
  // }, [])

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
