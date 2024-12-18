import React, { createContext, useContext, useState } from "react";
import LoaderModal from "../components/LoaderModal";
import Spinner from "../components/Spinner";

type LoadingContextType = {
  loadingScreen: boolean;
  setLoadingScreen: (loadingScreen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  loadingModal: boolean;
  setLoadingModal: (isLoading: boolean) => void
};

const LoadingContext = createContext<LoadingContextType>({
  loadingScreen: false,
  setLoadingScreen: () => { },
  isLoading: false,
  setIsLoading: () => { },
  loadingModal: false,
  setLoadingModal: () => { }
});

export function LoadingProvider(props: React.PropsWithChildren) {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingModal, setLoadingModal] = useState<boolean>(false)

  return (
    <LoadingContext.Provider
      value={{ loadingScreen, setLoadingScreen, isLoading, setIsLoading, loadingModal, setLoadingModal }}
    >
      <LoaderModal show={loadingModal} />
      <Spinner show={loadingScreen} />
      {props.children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext);