import React from 'react'
import LayoutCustom from '../../components/LayoutCustom'
import Container from '../../components/Container'
import { StyleService, TopNavigation } from '@ui-kitten/components'
import RoundedButton from '../../components/Buttons/RoundedButton'
import theme from '../../utils/theme'
import ActionCard from '../../components/cards/ActionsCards'
import { Dimensions } from 'react-native'
const windowHeight = Dimensions.get("window").height;

const Positions = () => {

  return (
    <Container style={themedStyles.container}>
      <TopNavigation
        alignment="center"
        title="Disponibilidad"
        style={themedStyles.topNavigation}
        accessoryLeft={() => (
          <RoundedButton icon="arrow-back-outline" />
        )}
        accessoryRight={() => <RoundedButton icon="person-outline" />}
      />
      <LayoutCustom style={themedStyles.content}>
        <LayoutCustom style={themedStyles.cardsContainer} justify="space-between">
          <LayoutCustom style={themedStyles.cardSize}>
            <ActionCard color="#009F9F" title="Emitir orden" />
          </LayoutCustom>
          <LayoutCustom style={themedStyles.cardSize}>
            <ActionCard color="#D0682E" title='Solicitar transferencia' />
          </LayoutCustom>
          <LayoutCustom style={themedStyles.cardSize}>
            <ActionCard color="#701BC4" title="Informar transferencia" />
          </LayoutCustom>
        </LayoutCustom>
      </LayoutCustom>
    </Container>
  )
}

export default Positions

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: theme.margins.small,
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  cardsContainer: {
    height: windowHeight * 0.7
  },
  cardSize: {
    height: windowHeight * 0.2
  }
});