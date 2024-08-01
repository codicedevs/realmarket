import React, { createContext, useContext, useState } from "react";
import disponibilidadService from "../service/disponibilidad.service";
import movimientosService from "../service/movimientos.service";
import { CifrasDisponibilidad, currencyMovements, currencyPositions } from "../types/financial.types";
import { useLoading } from "./LoadingProvider";

type InfoContextType = {
  // esto es para el home
  cifrasDisponibilidad: CifrasDisponibilidad;
  setCifrasDisponibilidad: (cifrasDisponibilidad: CifrasDisponibilidad) => void;
  //esto es para la pantalla positions
  currencyPositions: currencyPositions;
  setCurrencyPositions: (currencyPositions: currencyPositions) => void
  // esto es para la pantalla de disponibilidad 
  movements: currencyMovements;
  setMovements: (movements: currencyMovements) => void;
  getUserData: () => void
};

const InfoContext = createContext<InfoContextType>({
  cifrasDisponibilidad: null,
  setCifrasDisponibilidad: () => { },
  currencyPositions: null,
  setCurrencyPositions: () => { },
  movements: null,
  setMovements: () => { },
  getUserData: () => { }
});

export function InfoProvider(props: React.PropsWithChildren) {
  const [cifrasDisponibilidad, setCifrasDisponibilidad] = useState<CifrasDisponibilidad>(null)
  const [currencyPositions, setCurrencyPositions] = useState<currencyPositions>(null)
  const [movements, setMovements] = useState<currencyMovements>(null)
  const { setIsLoading } = useLoading()

  const getUserData = async () => {
    try {
      setIsLoading(true)
      // primera parte donde guardo datos
      const res = await disponibilidadService.getCashPositions() // cifras disponibilidad de home
      const resPos = await disponibilidadService.totalPositions()// datos de las positions de pantalla posiciones
      const [resArs, resUsd] = await Promise.all([
        movimientosService.getMovementsArs(),
        movimientosService.getMovementsUsd()
      ])
      //
      //aca voy a setear todo
      setCifrasDisponibilidad(res.data)
      setCurrencyPositions({
        arsPositions: resPos.data.totalPosiciones,
        usdPrice: resPos.data.usdPrice,
        usdPriceBcra: resPos.data.usdPriceBcra,
        posiciones: resPos.data.posiciones
      })
      setMovements({
        movementsArs: resArs.data.reverse(),
        movementsUsd: resUsd.data.reverse()
      })
      //
    } catch (e) {

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <InfoContext.Provider
      value={{ cifrasDisponibilidad, currencyPositions, setCurrencyPositions, setCifrasDisponibilidad, movements, setMovements, getUserData }}
    >
      {props.children}
    </InfoContext.Provider>
  )
}

export const useInfo = () => useContext(InfoContext)
