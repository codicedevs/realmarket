import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleService } from '@ui-kitten/components'
import { router } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity } from 'react-native'
import { TouchableOpacity as Touchable } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import IButton from '../../../components/Buttons/IButton'
import Container from '../../../components/Container'
import CurrencyToggle from '../../../components/CurrencyToggle'
import Header from '../../../components/CustomHeader'
import LayoutCustom from '../../../components/LayoutCustom'
import TimeCard from '../../../components/cards/TimeCard'
import OrderModal from '../../../components/orderModal'
import { AppContext } from '../../../context/AppContext'
import { useSession } from '../../../context/AuthProvider'
import { useLoading } from '../../../context/LoadingProvider'
import disponibilidadService from '../../../service/disponibilidad.service'
import { orderOptions } from '../../../types/order.types'
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
  const { setIsLoading, isLoading } = useLoading()
  const [order, setOrder] = useState(null)

  const selectOrder = (data: string) => {
    setOrder(data)
  }

  const checkData = () => {
    if (cifrasDisponibilidad) {
      return cifrasDisponibilidad
    }
    return mockData
  }

  const positionRoute = () => {
    router.replace('position')
  }

  const getCash = async () => {
    try {
      setIsLoading(true)
      const [res, resPos] = await Promise.all([
        disponibilidadService.getCashPositions(),
        disponibilidadService.totalPositions()
      ]);
      setCifrasDisponibilidad(res.data)
      setPositions(resPos.data.totalPosiciones)
      if (Object.keys(resPos.data).length !== 0) {
        const jsonValue = JSON.stringify(resPos.data.posiciones)
        await AsyncStorage.setItem('positions', jsonValue)
      }
      const jsonTotalPos = JSON.stringify(resPos.data.totalPosiciones)
      await AsyncStorage.setItem('totalPos', jsonTotalPos)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }

  const CARDS = [
    { color: "#009F9F", balance: currency === "ARS" ? checkData().dispoHoy : checkData().dispoHoyUsd, card_number: "5282300014453286", icon: require('../../../assets/Icons/todayClock.png') },
    { color: "#D0682E", balance: currency === "ARS" ? checkData().dispo24 : checkData().dispo24Usd, card_number: "5282300014453286", icon: require('../../../assets/Icons/clock24.png') },
    { color: "#701BC4", balance: currency === "ARS" ? checkData().dispo48 : checkData().dispo48Usd, card_number: "5282300014453286", icon: require('../../../assets/Icons/clock48.png') },
  ];

  useEffect(() => {
    getCash()

  }, [])

  const progressValue = useSharedValue<number>(0);
  return (
    <Container style={{ backgroundColor: theme.colors.background }}>
      {order && <OrderModal order={order} onClose={() => setOrder(null)} />}
      <LayoutCustom>
        <Header title={`Hola, ${typeof session === 'object' && session.nombre}`} />
        <LayoutCustom itemsCenter mt={theme.margins.large} mb={theme.margins.medium}>
          <CurrencyToggle />
        </LayoutCustom>
        <LayoutCustom horizontal ph={theme.paddings.medium}>
          {
            isLoading ?
              <ActivityIndicator size={'small'} />
              :
              null
          }
          <Text style={themedStyles.lastUpdateText}>Última actualización: {!isLoading ? new Date().toLocaleDateString() : null}</Text>
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
              <Touchable activeOpacity={1} key={index} style={{ height: '100%' }} onPress={() => router.navigate('/home/disponibilidad')}>
                <TimeCard item={item} currency={currency} />
              </Touchable>
            )
          }}
        />
        <TouchableOpacity activeOpacity={1} onPress={positionRoute}>
          <LayoutCustom horizontal itemsCenter justify='flex-start' mv={theme.margins.medium} pl={theme.paddings.large}>
            <Image style={themedStyles.img} source={require("../../../assets/Icons/moneyStat.png")} />
            <LayoutCustom ml={theme.margins.small} style={{ alignItems: "flex-start" }}>
              <Text style={themedStyles.position}>Posiciones</Text>
              <Text style={themedStyles.moneyText}>{isLoading ? <ActivityIndicator size={'small'} /> : currencyFormat(positions, currency)}</Text>
            </LayoutCustom>
          </LayoutCustom>
        </TouchableOpacity>
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
    fontSize: theme.fontSizes.small,
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