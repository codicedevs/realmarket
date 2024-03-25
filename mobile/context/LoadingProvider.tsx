import React, { createContext, useContext, useState } from "react";
import Spinner from "../components/Spinner";

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {}, 
});

export function LoadingProvider(props: React.PropsWithChildren){
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider
    value={{ isLoading, setIsLoading }}
    >
        <Spinner show={isLoading} />
          {props.children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext);