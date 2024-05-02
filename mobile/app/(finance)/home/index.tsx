import AsyncStorage from '@react-native-async-storage/async-storage'
import { useObject, useQuery, useRealm } from '@realm/react'
import { StyleService } from '@ui-kitten/components'
import { Link, router } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, Pressable, Text, TouchableOpacity } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { BSON } from 'realm'
import { ContainerArs, ContainerUsd, Position } from '../../../Realm/Schemas'
import IButton from '../../../components/Buttons/IButton'
import Container from '../../../components/Container'
import CurrencyToggle from '../../../components/CurrencyToggle'
import Header from '../../../components/CustomHeader'
import LayoutCustom from '../../../components/LayoutCustom'
import TimeCard from '../../../components/cards/TimeCard'
import { AppContext } from '../../../context/AppContext'
import { useSession } from '../../../context/AuthProvider'
import disponibilidadService from '../../../service/disponibilidad.service'
import movimientosService from '../../../service/movimientos.service'
import { currencyFormat } from '../../../utils/number'
import theme from '../../../utils/theme'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CifrasDisponibilidad {
  dispoHoy: number;
  dispo24: number;
  dispo48: number;
  dispoHoyUsd: number;
  dispo24Usd: number;
  dispo48Usd: number
}

const mockData = {
  "dispoHoy": 10000.1,
  "dispo24": 10000.1,
  "dispo48": 10000.1,
  "dispoHoyUsd": 500.83,
  "dispo24Usd": 500.83,
  "dispo48Usd": 500.83
}

const Home = () => {
  const { session } = useSession()
  const { currency } = useContext(AppContext)
  const [cifrasDisponibilidad, setCifrasDisponibilidad] = useState<CifrasDisponibilidad>(null)
  const [positions, setPositions] = useState(1000)
  const [loading, setLoading] = useState(false)
  const realm = useRealm();
  const info3 = useQuery(ContainerUsd)
  const info2 = useQuery(ContainerArs)
  const info1 = useQuery(Position)
  let Usd = info3 ? useObject(ContainerUsd, info3[0].id) : undefined;
  let Ars = info2 ? useObject(ContainerArs, info2[0].id) : undefined;
  let position = info1 ? useObject(Position, info1[0]._id) : undefined;

  const checkData = () => {
    if (cifrasDisponibilidad) {
      return cifrasDisponibilidad
    }
    return mockData
  }

  const positionRoute = () => {
    router.replace('position')
  }

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
    const totalPositions = await AsyncStorage.getItem('totalPositions')
    const positionsByDate = await AsyncStorage.getItem('positionsByDate')
    if (positionsByDate) {
      setCifrasDisponibilidad(JSON.parse(positionsByDate))
    }
    if (totalPositions) {
      setPositions(Number(totalPositions))
    }
  }

  const getAllData = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  }

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

  const handlePositionsData = async (res, resPos) => {
    if (Object.keys(res.data).length && Object.keys(resPos.data).length) {
      setCifrasDisponibilidad(res.data);
      setPositions(resPos.data.totalPosiciones);
      const positionsData = JSON.stringify(resPos.data.totalPosiciones);
      const positionByDate = JSON.stringify(res.data);
      await AsyncStorage.setItem('positionsByDate', positionByDate);
      await AsyncStorage.setItem('totalPositions', positionsData);

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

  const CARDS = [
    { color: "#009F9F", balance: currency === "ARS" ? checkData().dispoHoy : checkData().dispoHoyUsd, card_number: "5282300014453286", icon: require('../../../assets/Icons/todayClock.png') },
    { color: "#D0682E", balance: currency === "ARS" ? checkData().dispo24 : checkData().dispo24Usd, card_number: "5282300014453286", icon: require('../../../assets/Icons/clock24.png') },
    { color: "#701BC4", balance: currency === "ARS" ? checkData().dispo48 : checkData().dispo48Usd, card_number: "5282300014453286", icon: require('../../../assets/Icons/clock48.png') },
  ];

  useEffect(() => {
    getAllData()
    settingData()
  }, [])

  const progressValue = useSharedValue<number>(0);
  return (
    <Container style={{ backgroundColor: theme.colors.background }}>
      <LayoutCustom>
        <Header title={`Hola ${session.nombre}!`} />
        <LayoutCustom itemsCenter mt={theme.margins.large} mb={theme.margins.medium}>
          <CurrencyToggle />
        </LayoutCustom>
        <LayoutCustom horizontal ph={theme.paddings.medium}>
          {
            loading ?
              <ActivityIndicator size={'small'} />
              :
              null
          }
          <Text style={themedStyles.lastUpdateText}>Última actualización: 17/03</Text>
        </LayoutCustom>
        <Carousel
          data={CARDS}
          width={windowWidth * 0.9}
          height={212 * (windowHeight / 812)}
          loop={false}
          style={{ ...themedStyles.carouselStyle, width: windowWidth }}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.96,
            parallaxScrollingOffset: 10,
          }}
          renderItem={({ item, index }) => {
            return (
              <Link href={'/home/disponibilidad'} asChild style={{ height: '100%' }}>
                <Pressable>
                  <TimeCard item={item} currency={currency} />
                </Pressable>
              </Link>
            )
          }}
        />
        <TouchableOpacity activeOpacity={1} onPress={positionRoute}>
          <LayoutCustom horizontal itemsCenter justify='flex-start' mv={theme.margins.medium} pl={theme.paddings.large}>
            <Image style={themedStyles.img} source={require("../../../assets/Icons/moneyStat.png")} />
            <LayoutCustom ml={theme.margins.small} style={{ alignItems: "flex-start" }}>
              <Text style={themedStyles.position}>Posiciones</Text>
              <Text style={themedStyles.moneyText}>{currencyFormat(positions, currency)}</Text>
            </LayoutCustom>
          </LayoutCustom>
        </TouchableOpacity>
        <LayoutCustom
          horizontal
          itemsCenter
          justify="center"
        >
          <LayoutCustom alignSelfCenter style={themedStyles.buttonContainer}>
            <IButton name={require(`../../../assets/Icons/ordenIcon.png`)} icon="wallet_send" title={`Informar\norden`} />
          </LayoutCustom>
          <LayoutCustom style={themedStyles.buttonContainer}>
            <IButton name={require(`../../../assets/Icons/transferIcon.png`)} icon="document" title={`Solicitar\ntransferencia`} />
          </LayoutCustom>
        </LayoutCustom>
      </LayoutCustom>
    </Container>
  )
}

export default Home



const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  img: {
    width: theme.image.bigger,
    height: theme.image.bigger
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
    backgroundColor: theme.colors.background
  },
  moneyText: {
    color: theme.colors.skyBlue,
    fontSize: theme.fontSizes.body,
  },
  buttonContainer: {
    width: windowWidth * 0.5,
    padding: theme.paddings.medium
  },
  carouselStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  position: {
    fontSize: theme.fontSizes.body,
    marginBottom: theme.margins.xSmall,
    color: 'white'
  },
  lastUpdateText: {
    color: 'white',
    fontSize: 15,
  }
});