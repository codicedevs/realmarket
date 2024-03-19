import { StyleService, TopNavigation } from '@ui-kitten/components'
import React from 'react'
import { Dimensions } from 'react-native'
import RoundedButton from '../../components/Buttons/RoundedButton'
import Container from '../../components/Container'
import LayoutCustom from '../../components/LayoutCustom'
import ActionCard from '../../components/cards/ActionsCards'
import theme from '../../utils/theme'
const windowHeight = Dimensions.get("window").height;

const Positions = () => {

  return (
    <Container style={themedStyles.container}>
      <TopNavigation
        alignment="center"
        title="Ordenes"
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
    backgroundColor: theme.colors.background
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
    backgroundColor: theme.colors.background
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