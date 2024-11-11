import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useRealm } from "@realm/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BSON } from "realm";
import { ContainerArs, ContainerUsd, Position } from "../Realm/Schemas";
import disponibilidadService from "../service/disponibilidad.service";
import movimientosService from "../service/movimientos.service";
import { CifrasDisponibilidad, currencyMovements, currencyPositions } from "../types/financial.types";
import { useLoading } from "./LoadingProvider";

type InfoContextType = {
  cifrasDisponibilidad: CifrasDisponibilidad;
  setCifrasDisponibilidad: (cifrasDisponibilidad: CifrasDisponibilidad) => void;
  currencyPositions: currencyPositions;
  setCurrencyPositions: (currencyPositions: currencyPositions) => void;
  movements: currencyMovements;
  setMovements: (movements: currencyMovements) => void;
  getAllData: () => void;
  clearAllDataFromRealm: () => void;
};

const InfoContext = createContext<InfoContextType>({
  cifrasDisponibilidad: null,
  setCifrasDisponibilidad: () => { },
  currencyPositions: null,
  setCurrencyPositions: () => { },
  movements: null,
  setMovements: () => { },
  getAllData: () => { },
  clearAllDataFromRealm: () => { },
});

export function InfoProvider(props: React.PropsWithChildren) {
  const [cifrasDisponibilidad, setCifrasDisponibilidad] = useState<CifrasDisponibilidad>(null);
  const [currencyPositions, setCurrencyPositions] = useState<currencyPositions>(null);
  const [movements, setMovements] = useState<currencyMovements>(null);
  const { setIsLoading, setLoadingModal } = useLoading();

  const realm = useRealm();
  const info3 = useQuery(ContainerUsd);
  const info2 = useQuery(ContainerArs);
  const info1 = useQuery(Position);

  let Usd = info3.length ? info3[0]?.id : undefined;
  let Ars = info2.length ? info2[0]?.id : undefined;
  let position = info1.length ? info1[0]?._id : undefined;

  const clearAllDataFromRealm = async () => {
    try {
      realm.write(() => {
        realm.deleteAll();
      });
      console.log('All data cleared from Realm.');
    } catch (error) {
      console.error('Error clearing data from Realm:', error);
    }
  };

  const safeRealmWrite = async (action) => {
    try {
      realm.write(() => {
        action();
      });
    } catch (error) {
      console.error('Error during Realm operation:', error);
    }
  };

  const settingData = async () => {

    const positionsByDate = await AsyncStorage.getItem('positionsByDate');
    if (positionsByDate) {
      setCifrasDisponibilidad(JSON.parse(positionsByDate));
    }
  };

  const getAllData = async (mustLoad = false) => {
    setIsLoading(mustLoad)
    if (!info1[0] || !info2[0] || !info3[0]) setLoadingModal(true);
    try {

      const [res, resPos, resArs, resUsd] = await Promise.all([
        disponibilidadService.getCashPositions(),
        disponibilidadService.totalPositions(),
        movimientosService.getMovementsArs(),
        movimientosService.getMovementsUsd()
      ]);
      await handlePositionsData(res, resPos);
      await handleMovementsData(resArs.data.reverse(), 'ContainerArs');
      await handleMovementsData(resUsd.data.reverse(), 'ContainerUsd');
    } catch (err) {
      console.error('Error fetching all data:', err);
    } finally {
      setLoadingModal(false);
      setIsLoading(false)
    }
  };

  const handleMovementsData = async (res, containerType) => {
    const Container = containerType === 'ContainerUsd' ? Usd : Ars;

    if (Container && res.length) {
      console.log(`Updating existing ${containerType} records...`);
      await safeRealmWrite(() => {
        Container.movimientos = res;
      });
    } else if (res.length) {
      console.log(`Starting transaction in Realm for ${containerType}...`);
      await safeRealmWrite(() => {
        realm.create(containerType, {
          id: new BSON.UUID(),
          movimientos: res
        }, Realm.UpdateMode.All);
        console.log(`Data for ${containerType} loaded successfully.`);
      });
    }
  };

  const handlePositionsData = async (res, resPos) => {
    try {

      if (Object.keys(res.data).length && Object.keys(resPos.data).length) {
        console.log(resPos.data.totalPosiciones, 'en el handle');
        setCifrasDisponibilidad(res.data);
        const positionsData = JSON.stringify(resPos.data.totalPosiciones);
        const positionByDate = JSON.stringify(res.data);
        await AsyncStorage.setItem('positionsByDate', positionByDate);
        await AsyncStorage.setItem('totalPositions', positionsData);

        await safeRealmWrite(() => {

          let existingPosition = realm.objectForPrimaryKey('Position', position);
          if (existingPosition) {
            console.log('Updating existing Position record...', resPos.data.totalPosiciones);
            existingPosition.totalPosiciones = resPos.data.totalPosiciones;
            existingPosition.usdPrice = resPos.data.usdPrice;
            existingPosition.usdPriceBcra = resPos.data.usdPriceBcra;
            existingPosition.posiciones = resPos.data.posiciones;
          } else {
            console.log('Starting transaction in Realm for Position...');
            console.log('opstiion', resPos.data.posiciones)
            realm.create('Position', {
              _id: new BSON.UUID(),
              totalPosiciones: resPos.data.totalPosiciones,
              usdPrice: resPos.data.usdPrice,
              usdPriceBcra: resPos.data.usdPriceBcra,
              posiciones: resPos.data.posiciones
            }, Realm.UpdateMode.Modified);
          }
          console.log('asi queda', existingPosition.totalPosiciones)
        });
      }
    } catch (error) {
      console.error('Error handling positionsssss data:', error);
    }
  };

  useEffect(() => {
    settingData();
  }, []);

  return (
    <InfoContext.Provider
      value={{
        cifrasDisponibilidad,
        currencyPositions,
        setCurrencyPositions,
        setCifrasDisponibilidad,
        movements,
        setMovements,
        getAllData,
        clearAllDataFromRealm
      }}
    >
      {props.children}
    </InfoContext.Provider>
  );
}

export const useInfo = () => useContext(InfoContext);
