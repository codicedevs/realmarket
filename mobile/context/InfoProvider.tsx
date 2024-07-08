import React, { createContext, useState } from "react";
import { CifrasDisponibilidad, currencyPositions } from "../types/financial.types";

type LoadingContextType = {
  cifrasDisponibilidad: CifrasDisponibilidad;
  setCifrasDisponibilidad: (loadingScreen: CifrasDisponibilidad) => void;
  currencyPositions: currencyPositions;
  setCurrencyPositions: (currencyPositions: currencyPositions) => void
};

const LoadingContext = createContext<LoadingContextType>({
  cifrasDisponibilidad: null,
  setCifrasDisponibilidad: () => { },
  currencyPositions: null,
  setCurrencyPositions: () => { },
});

export function InfoProvider(props: React.PropsWithChildren) {
  const [cifrasDisponibilidad, setCifrasDisponibilidad] = useState<CifrasDisponibilidad>(null)
  const [currencyPositions, setCurrencyPositions] = useState<currencyPositions>(null)

  return (
    <LoadingContext.Provider
      value={{ cifrasDisponibilidad, currencyPositions, setCurrencyPositions, setCifrasDisponibilidad }}
    >
      {props.children}
    </LoadingContext.Provider>
  )
}
