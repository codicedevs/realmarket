import React, { createContext, useContext, useState } from "react";
import Spinner from "../components/Spinner";

type LoadingContextType = {
  loadingScreen: boolean;
  setLoadingScreen: (loadingScreen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void
};

const LoadingContext = createContext<LoadingContextType>({
  loadingScreen: false,
  setLoadingScreen: () => { },
  isLoading: false,
  setIsLoading: () => { },
});

export function LoadingProvider(props: React.PropsWithChildren) {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <LoadingContext.Provider
      value={{ loadingScreen, setLoadingScreen, isLoading, setIsLoading }}
    >
      <Spinner show={loadingScreen} />
      {props.children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext);