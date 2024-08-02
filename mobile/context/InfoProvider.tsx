import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useRealm } from "@realm/react";
import React, { createContext, useContext, useState } from "react";
import { BSON } from "realm";
import { ContainerArs, ContainerUsd, Position } from "../Realm/Schemas";
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
  getUserData: () => void;
  getAllData: () => void;
};

const InfoContext = createContext<InfoContextType>({
  cifrasDisponibilidad: null,
  setCifrasDisponibilidad: () => { },
  currencyPositions: null,
  setCurrencyPositions: () => { },
  movements: null,
  setMovements: () => { },
  getUserData: () => { },
  getAllData: () => { },
});

export function InfoProvider(props: React.PropsWithChildren) {
  const [cifrasDisponibilidad, setCifrasDisponibilidad] = useState<CifrasDisponibilidad>(null)
  const [currencyPositions, setCurrencyPositions] = useState<currencyPositions>(null)
  const [movements, setMovements] = useState<currencyMovements>(null)
  const { setIsLoading } = useLoading()


  const realm = useRealm();
  const info3 = useQuery(ContainerUsd)
  const info2 = useQuery(ContainerArs)
  const info1 = useQuery(Position)
  // let Usd = info3 ? useObject(ContainerUsd, info3[0]?.id) : undefined;
  // let Ars = info2 ? useObject(ContainerArs, info2[0]?.id) : undefined;
  // let position = info1 ? useObject(Position, info1[0]?._id) : undefined;
  let Usd = undefined;
  let Ars = undefined;
  let position = undefined;
  const getUserData = async () => {
    try {
      setIsLoading(true)
      // primera parte donde RECIBO datos 1.
      const res = await disponibilidadService.getCashPositions() // cifras disponibilidad de home
      const resPos = await disponibilidadService.totalPositions()// datos de las positions de pantalla posiciones
      const [resArs, resUsd] = await Promise.all([
        movimientosService.getMovementsArs(),
        movimientosService.getMovementsUsd()
      ])
      //
      //aca voy a SETO todo 2.
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

  const guardatodoenrealm = () => {

  }

  const safeRealmWrite = async (action) => {
    //esto lo tengo que usar para las creaciones finales
    try {
      realm.write(() => {
        action();
      });
    } catch (error) {
      console.error('Error during Realm operation:', error);
    }
  };

  const settingData = async () => {
    // aca seteo lo que ya esta cargado
    const totalPositions = await AsyncStorage.getItem('totalPositions')
    const positionsByDate = await AsyncStorage.getItem('positionsByDate')
    if (positionsByDate) {
      // setCifrasDisponibilidad(JSON.parse(positionsByDate))
    }
    if (totalPositions) {
      // setPositions(Number(totalPositions))
    }
  }

  const getAllData = async () => {
    try {
      // setLoading(true);
      //Busco todos los datos
      const [res, resPos, resArs, resUsd] = await Promise.all([
        disponibilidadService.getCashPositions(),
        disponibilidadService.totalPositions(),
        movimientosService.getMovementsArs(),
        movimientosService.getMovementsUsd()
      ]);
      //Manejo todos los datos con estas funciones
      handlePositionsData(res, resPos);
      handleMovementsData(resArs, 'ContainerArs');
      handleMovementsData(resUsd, 'ContainerUsd');
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      // setLoading(false);
    }
  }

  // aca guardo lo de movimientos en dolares y pesos
  const handleMovementsData = async (res, containerType) => {
    const Container = containerType === 'ContainerUsd' ? Usd : Ars;

    if (Container && res.data.length) {
      console.log(`Updating existing ${containerType} records...`);
      await safeRealmWrite(() => {
        Container.movimientos = res.data;
      });
    } else if (res.data.length) {
      console.log(`Starting transaction in Realm for ${containerType}...`);
      await safeRealmWrite(() => {
        realm.create(containerType, {
          id: new BSON.UUID(),
          movimientos: res.data
        }, Realm.UpdateMode.All);
        console.log(`Data for ${containerType} loaded successfully.`);
      });
    }
  };

  //y aca guardo la disponibilidad y posicones
  const handlePositionsData = async (res, resPos) => {
    if (Object.keys(res.data).length && Object.keys(resPos.data).length) {
      setCifrasDisponibilidad(res.data);
      // setPositions(resPos.data.totalPosiciones);
      const positionsData = JSON.stringify(resPos.data.totalPosiciones);
      const positionByDate = JSON.stringify(res.data);
      await AsyncStorage.setItem('positionsByDate', positionByDate);
      await AsyncStorage.setItem('totalPositions', positionsData);
      console.log(resPos.data, 'llega mal?')
      // console.log('Checking if position exists...');
      await safeRealmWrite(() => {
        if (position) {
          position.totalPosiciones = resPos.data.totalPosiciones;
          position.usdPrice = resPos.data.usdPrice;
          position.usdPriceBcra = resPos.data.usdPriceBcra;
          position.posiciones = resPos.data.posiciones;
        } else {
          realm.create('Position', {
            _id: new BSON.UUID(),
            totalPosiciones: resPos.data.totalPosiciones,
            usdPrice: resPos.data.usdPrice,
            usdPriceBcra: resPos.data.usdPriceBcra,
            posiciones: resPos.data.posiciones
          }, Realm.UpdateMode.Modified);
        }
      });
    }
  };

  return (
    <InfoContext.Provider
      value={{ cifrasDisponibilidad, currencyPositions, setCurrencyPositions, setCifrasDisponibilidad, movements, setMovements, getUserData, getAllData }}
    >
      {props.children}
    </InfoContext.Provider>
  )
}

export const useInfo = () => useContext(InfoContext)
