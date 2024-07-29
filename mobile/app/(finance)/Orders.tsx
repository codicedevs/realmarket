import { StyleService } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import ActionCard from '../../components/cards/ActionsCards'
import Container from '../../components/Container'
import Header from '../../components/CustomHeader'
import LayoutCustom from '../../components/LayoutCustom'
import OrderModal from '../../components/orderModal'
import { orderOptions } from '../../types/order.types'
import theme from '../../utils/theme'
const windowHeight = Dimensions.get("window").height;

const Positions = () => {
  const [order, setOrder] = useState(null)

  const selectOrder = (data: string) => {
    setOrder(data)
  }

  return (
    <>
      {order && <OrderModal order={order} onClose={() => setOrder(null)} />}
      <Container style={themedStyles.container}>
        <Header title={'Órdenes'} />
        <LayoutCustom style={themedStyles.content}>
          <LayoutCustom style={themedStyles.cardsContainer} justify="space-evenly">
            <LayoutCustom style={themedStyles.cardSize}>
              <TouchableOpacity onPress={() => selectOrder(orderOptions.EMIT)}>
                <ActionCard color="#009F9F" title="Emitir orden" />
              </TouchableOpacity>
            </LayoutCustom>
            <LayoutCustom style={themedStyles.cardSize}>
              <TouchableOpacity onPress={() => selectOrder(orderOptions.REQUEST)}>
                <ActionCard color="#D0682E" title='Solicitar transferencia' />
              </TouchableOpacity>
            </LayoutCustom>
          </LayoutCustom>
        </LayoutCustom>
      </Container>
    </>
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