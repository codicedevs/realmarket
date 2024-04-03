import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleService, TopNavigation } from '@ui-kitten/components'
import { Link, router } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, Pressable, Text } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import IButton from '../../../components/Buttons/IButton'
import RoundedButton from '../../../components/Buttons/RoundedButton'
import Container from '../../../components/Container'
import CurrencyToggle from '../../../components/CurrencyToggle'
import LayoutCustom from '../../../components/LayoutCustom'
import TimeCard from '../../../components/cards/TimeCard'
import { AppContext } from '../../../context/AppContext'
import { useSession } from '../../../context/AuthProvider'
import usePromise from '../../../hooks/usePromise'
import disponibilidadService from '../../../service/disponibilidad.service'
import { currencyFormat } from '../../../utils/number'
import theme from '../../../utils/theme'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface CifrasDisponibilidad {
  dispoHoy: string;
  dispo24: string;
  dispo48: string;
  dispoHoyUsd: string;
  dispo24Usd: string;
  dispo48Usd: string
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
  const handlePromise = usePromise()

  const configRoute = () => {
    router.replace('config')
  }

  const checkData = () => {
    if (cifrasDisponibilidad) {
      return cifrasDisponibilidad
    }
    return mockData
  }

  const promises = async () => {
    const res = await disponibilidadService.getCashPositions()
    const resPos = await disponibilidadService.totalPositions()
    setCifrasDisponibilidad(res.data)
    setPositions(resPos.data.totalPosiciones)
  }

  const getCash = async () => {
    try {
      setLoading(true)
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
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
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
      <LayoutCustom>
        <TopNavigation
          alignment="center"
          title={`Hola ${session.nombre}!`}
          style={themedStyles.topNavigation}
          accessoryLeft={() => (
            <RoundedButton icon="arrow-back-outline" />
          )}
          accessoryRight={() => <RoundedButton onPress={() => configRoute()} icon="person-outline" />}
        />
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
          <Text style={themedStyles.lastUpdateText}>Ultima actualizacion: 17/03</Text>
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
        <LayoutCustom horizontal itemsCenter justify='flex-start' mv={theme.margins.medium} pl={theme.paddings.large}>
          <Image style={themedStyles.img} source={require("../../../assets/Icons/moneyStat.png")} />
          <LayoutCustom ml={theme.margins.medium} style={{ alignItems: "flex-start" }}>
            <Text style={themedStyles.position}>Posiciones</Text>
            <Text style={themedStyles.moneyText}>{currencyFormat(positions, currency)}</Text>
          </LayoutCustom>
        </LayoutCustom>
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
    fontSize: theme.fontSizes.header,
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
    fontSize: theme.fontSizes.header,
    marginBottom: theme.margins.xSmall,
    color: 'white'
  },
  lastUpdateText: {
    color: 'white',
    fontSize: 15,
  }
});