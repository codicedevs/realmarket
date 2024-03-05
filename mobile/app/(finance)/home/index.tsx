import React, { useState } from 'react'
import { Button, Dimensions, Image, Pressable, Text, View } from 'react-native'
import { useSession } from '../../../context/AuthProvider'
import Container from '../../../components/Container'
import LayoutCustom from '../../../components/LayoutCustom'
import { StyleService, TopNavigation } from '@ui-kitten/components'
import RoundedButton from '../../../components/Buttons/RoundedButton'
import CurrencyToggle from '../../../components/CurrencyToggle'
import theme from '../../../utils/theme'
import TimeCard from '../../../components/cards/TimeCard'
import IButton from '../../../components/Buttons/IButton'
import Carousel from 'react-native-reanimated-carousel'
import { useSharedValue } from 'react-native-reanimated'
import { Link, Redirect, router } from 'expo-router'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = () => {
  const { session, signOut } = useSession()
  const [currency, setCurrency] = useState('ARS')
   
  const configRoute = () => {
    router.replace('config')
  }

  const progressValue = useSharedValue<number>(0);
  return (
    <Container style={{ backgroundColor: theme.colors.background }}>
      <LayoutCustom>
        <TopNavigation
          alignment="center"
          title="Home"
          style={themedStyles.topNavigation}
          accessoryLeft={() => (
            <RoundedButton icon="arrow-back-outline" />
          )}
          accessoryRight={() => <RoundedButton onPress={() => configRoute()} icon="person-outline" />}
        />
        <LayoutCustom itemsCenter mt={theme.margins.large} mb={theme.margins.medium}>
          <CurrencyToggle changeCurrency={setCurrency} />
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
              <Link href={'/home/disponibility'} asChild style={{height:'100%'}}>
                <Pressable>
                  <TimeCard item={item} />
                </Pressable>
              </Link>
            )
          }}
        />
        <LayoutCustom horizontal itemsCenter justify='flex-start' mv={theme.margins.medium} pl={theme.paddings.large}>
          <Image style={themedStyles.img} source={require("../../../assets/Icons/moneyStat.png")} />
          <LayoutCustom ml={theme.margins.medium} style={{ alignItems: "flex-start" }}>
            <Text style={themedStyles.position}>Posiciones</Text>
            <Text style={themedStyles.moneyText}>$20.455.342,88</Text>
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

const CARDS = [
  { color: "#009F9F", balance: 15245.9, card_number: "5282300014453286", icon: require('../../../assets/Icons/todayClock.png') },
  { color: "#D0682E", balance: 24245.9, card_number: "5282300014453286", icon: require('../../../assets/Icons/clock24.png') },
  { color: "#701BC4", balance: 151245.9, card_number: "5282300014453286", icon: require('../../../assets/Icons/clock48.png') },
];

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
  }
});