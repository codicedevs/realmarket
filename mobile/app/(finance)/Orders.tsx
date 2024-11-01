import { StyleService } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Dimensions, Modal, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'
import Container from '../../components/Container'
import Header from '../../components/CustomHeader'
import LayoutCustom from '../../components/LayoutCustom'
import ActionCard from '../../components/cards/ActionsCards'
import { orderOptions } from '../../types/order.types'
import theme from '../../utils/theme'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const iframeUrls = {
  [orderOptions.EMIT]: "https://docs.google.com/forms/d/e/1FAIpQLSe6k-AKFxILjPhl7SQSnunBJvDsXOTw2OgMfEkTEb5jkBR7lw/viewform?embedded=true",
  [orderOptions.REQUEST]: "https://docs.google.com/forms/d/e/1FAIpQLSdg8sWJJj9TJ8W_fO-l6bKrd1jighfdkG1uqd5tZFFfLIdcBQ/viewform?embedded=true"
};

const Positions = () => {
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState('')

  const selectOrder = (data: string) => {
    setOrder(data)
    setOpen(true)
  }


  return (
    <>
      <Modal
        animationType="fade"
        visible={open}
        transparent={true}
        onRequestClose={() => setOpen(false)}
      >
        {order in iframeUrls && (
          <WebView style={{
            height: 400,
            width: '95%',
            alignSelf: 'center'
          }} source={{ uri: iframeUrls[order] }} />
        )}
      </Modal>
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