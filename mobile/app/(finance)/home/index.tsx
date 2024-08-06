// import { useObject, useQuery, useRealm } from '@realm/react'
import { StyleService } from '@ui-kitten/components'
import { router } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, Text } from 'react-native'
import { TouchableOpacity as Touchable, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
// import { BSON } from 'realm'
// import { ContainerArs, ContainerUsd, Position } from '../../../Realm/Schemas'
import { useQuery } from '@realm/react'
import { Position } from '../../../Realm/Schemas'
import IButton from '../../../components/Buttons/IButton'
import Container from '../../../components/Container'
import CurrencyToggle from '../../../components/CurrencyToggle'
import Header from '../../../components/CustomHeader'
import LayoutCustom from '../../../components/LayoutCustom'
import TimeCard from '../../../components/cards/TimeCard'
import OrderModal from '../../../components/orderModal'
import { AppContext } from '../../../context/AppContext'
import { useSession } from '../../../context/AuthProvider'
import { useInfo } from '../../../context/InfoProvider'
import { useLoading } from '../../../context/LoadingProvider'
import { orderOptions } from '../../../types/order.types'
import { currencyFormat } from '../../../utils/number'
import theme from '../../../utils/theme'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const mockData = {
  "dispoHoy": 3,
  "dispo24": 0,
  "dispo48": 0,
  "dispoHoyUsd": 0,
  "dispo24Usd": 0,
  "dispo48Usd": 0
}

const Home = () => {
  const { session } = useSession()
  const { currency } = useContext(AppContext)

  const positions = useQuery(Position)
  const currencyPositions = positions && positions[0]

  const { isLoading } = useLoading()
  const [order, setOrder] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const { getUserData, cifrasDisponibilidad, getAllData } = useInfo()

  const selectOrder = (data: string) => {
    setOrder(data)
  }

  const onRefresh = () => {
    try {
      setRefreshing(true)
      getUserData()
    }
    catch (e) { }
    finally {
      setRefreshing(false)
    }
  }

  const checkData = () => {
    if (cifrasDisponibilidad) {
      return cifrasDisponibilidad
    }
    return 'unavailable'
  }

  const positionRoute = () => {
    router.replace('position')
  }

  // esto es lo que usaba para guardar todo en realm y posteriormente guardarlo en todos lados 

  // const safeRealmWrite = async (action) => {
  //     try {
  //       realm.write(() => {
  //         action();
  //       });
  //     } catch (error) {
  //       console.error('Error during Realm operation:', error);
  //     }
  //   };

  //   const settingData = async () => {
  //     const totalPositions = await AsyncStorage.getItem('totalPositions')
  //     const positionsByDate = await AsyncStorage.getItem('positionsByDate')
  //     if (positionsByDate) {
  //       setCifrasDisponibilidad(JSON.parse(positionsByDate))
  //     }
  //     if (totalPositions) {
  //       setPositions(Number(totalPositions))
  //     }
  //   }

  //   const getAllData = async () => {
  //     try {
  //       setLoading(true);
  //       //Busco todos los datos
  //       const [res, resPos, resArs, resUsd] = await Promise.all([
  //         disponibilidadService.getCashPositions(),
  //         disponibilidadService.totalPositions(),
  //         movimientosService.getMovementsArs(),
  //         movimientosService.getMovementsUsd()
  //       ]);
  //       //Manejo todos los datos con estas funciones
  //       handlePositionsData(res, resPos);
  //       handleMovementsData(resArs, 'ContainerArs');
  //       handleMovementsData(resUsd, 'ContainerUsd');
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  // aca guardo lo de movimientos en dolares y pesos
  // const handleMovementsData = async (res, containerType) => {
  //   const Container = containerType === 'ContainerUsd' ? Usd : Ars;

  //   if (Container && res.data.length) {
  //     console.log(`Updating existing ${containerType} records...`);
  //     await safeRealmWrite(() => {
  //       Container.movimientos = res.data;
  //     });
  //   } else if (res.data.length) {
  //     console.log(`Starting transaction in Realm for ${containerType}...`);
  //     await safeRealmWrite(() => {
  //       realm.create(containerType, {
  //         id: new BSON.UUID(),
  //         movimientos: res.data
  //       }, Realm.UpdateMode.All);
  //       console.log(`Data for ${containerType} loaded successfully.`);
  //     });
  //   }
  // };

  //y aca guardo la disponibilidad y posicones
  // const handlePositionsData = async (res, resPos) => {
  //   if (Object.keys(res.data).length && Object.keys(resPos.data).length) {
  //     setCifrasDisponibilidad(res.data);
  //     setPositions(resPos.data.totalPosiciones);
  //     const positionsData = JSON.stringify(resPos.data.totalPosiciones);
  //     const positionByDate = JSON.stringify(res.data);
  //     await AsyncStorage.setItem('positionsByDate', positionByDate);
  //     await AsyncStorage.setItem('totalPositions', positionsData);

  //     // console.log('Checking if position exists...');
  //     await safeRealmWrite(() => {
  //       if (position) {
  //         position.totalPosiciones = resPos.data.totalPosiciones;
  //         position.usdPrice = resPos.data.usdPrice;
  //         position.usdPriceBcra = resPos.data.usdPriceBcra;
  //         position.posiciones = resPos.data.posiciones;
  //       } else {
  //         realm.create('Position', {
  //           _id: new BSON.UUID(),
  //           totalPosiciones: resPos.data.totalPosiciones,
  //           usdPrice: resPos.data.usdPrice,
  //           usdPriceBcra: resPos.data.usdPriceBcra,
  //           posiciones: resPos.data.posiciones
  //         }, Realm.UpdateMode.Modified);
  //       }
  //     });
  //   }
  // };

  const CARDS = [
    { color: "#009F9F", balance: currency === "ARS" ? checkData().dispoHoy : checkData().dispoHoyUsd, card_number: "5282300014453286", icon: require('../../../assets/Icons/todayClock.png') },
    { color: "#D0682E", balance: currency === "ARS" ? checkData().dispo24 : checkData().dispo24Usd, card_number: "5282300014453286", icon: require('../../../assets/Icons/clock24.png') }
  ];

  useEffect(() => {
    getAllData()
    // settingData()
    // getUserData()
  }, [])

  const progressValue = useSharedValue<number>(0);
  return (
    <>
      {/* <LoaderModal /> */}
      <Container style={{ backgroundColor: theme.colors.background }}>
        {order && <OrderModal order={order} onClose={() => setOrder(null)} />}
        <LayoutCustom>
          <Header title={`Hola ${typeof session === 'object' && session.nombre.split(" ")[0]}`} />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <LayoutCustom itemsCenter mt={theme.margins.large} mb={theme.margins.medium}>
              <CurrencyToggle />
            </LayoutCustom>
            <LayoutCustom style={{ height: windowHeight * 0.03, justifyContent: "space-between" }} itemsCenter mb={10} horizontal ph={theme.paddings.medium}>
              <Text style={themedStyles.lastUpdateText}>Última actualización: {!isLoading ? new Date().toLocaleDateString() : null}</Text>
              {
                isLoading ?
                  <ActivityIndicator color={'#009F9F'} size={'small'} style={{ marginRight: 10 }} />
                  :
                  <TouchableWithoutFeedback onPress={() => getUserData()}>
                    <Image resizeMode='contain' source={require('../../../assets/Icons/reload.png')} style={{ width: 20, height: 25, marginRight: 10 }} />
                  </TouchableWithoutFeedback>
              }
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
                  <Touchable activeOpacity={1} key={index} style={{ height: '100%' }} onPress={() => router.navigate('/availability')}>
                    <TimeCard item={item} currency={currency} />
                  </Touchable>
                )
              }}
            />
            <TouchableWithoutFeedback onLongPress={() => { }} onPress={positionRoute}>
              <LayoutCustom horizontal itemsCenter justify='flex-start' mv={theme.margins.medium} pl={theme.paddings.large}>
                <Image style={themedStyles.img} source={require("../../../assets/Icons/money.png")} />
                <LayoutCustom ml={theme.margins.small} style={{ alignItems: "flex-start" }}>
                  <Text style={themedStyles.position}>Posiciones</Text>
                  <Text style={themedStyles.moneyText}>{isLoading ? <ActivityIndicator color={'#009F9F'} size={'small'} /> : currencyFormat(currencyPositions?.totalPosiciones, 'ARS')}</Text>
                </LayoutCustom>
              </LayoutCustom>
            </TouchableWithoutFeedback>
            <LayoutCustom
              horizontal
              itemsCenter
              justify="center"
            >
              <LayoutCustom alignSelfCenter style={themedStyles.buttonContainer}>
                <IButton onPress={() => selectOrder(orderOptions.EMIT)} name={require(`../../../assets/Icons/ordenIcon.png`)} icon="wallet_send" title={`Informar\norden`} />
              </LayoutCustom>
              <LayoutCustom style={themedStyles.buttonContainer}>
                <IButton onPress={() => selectOrder(orderOptions.REQUEST)} name={require(`../../../assets/Icons/transferIcon.png`)} icon="document" title={`Solicitar\ntransferencia`} />
              </LayoutCustom>
            </LayoutCustom>
          </ScrollView>
        </LayoutCustom>
      </Container>
    </>
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
    fontSize: theme.fontSizes.small,
    fontFamily: 'Lato-Regular'
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
    color: 'white',
    fontFamily: 'Lato-Regular'
  },
  lastUpdateText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Lato-Regular'
  }
});