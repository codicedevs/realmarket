import { useQuery } from "@realm/react"
import { StyleService } from "@ui-kitten/components"
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import React, { useContext, useState } from "react"
import { ActivityIndicator, Dimensions, FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native"
import BalanceCard from "../../components/cards/BalanceCard"
import Container from "../../components/Container"
import CurrencyToggle from "../../components/CurrencyToggle"
import Header from "../../components/CustomHeader"
import LayoutCustom from "../../components/LayoutCustom"
import TransactionItem, { ITransactionItemProps } from "../../components/TransactionItem"
import { AppContext } from "../../context/AppContext"
import { useInfo } from "../../context/InfoProvider"
import { useLoading } from "../../context/LoadingProvider"
import { ContainerArs, ContainerUsd } from "../../Realm/Schemas"
import movimientosService from "../../service/movimientos.service"
import { currencyFormat } from "../../utils/number"
import { saveFilePdf } from "../../utils/saveFile"
import theme from "../../utils/theme"
const windowWidth = Dimensions.get("window").width;

const Disponibility = () => {
  const movementUsd = useQuery(ContainerUsd)
  const movementArs = useQuery(ContainerArs)
  const { currency } = useContext(AppContext)
  const [open, setOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<ITransactionItemProps>(null)
  const { setIsLoading } = useLoading()
  const { isLoading } = useLoading()

  const [loading, setLoading] = useState(false)
  const { movements } = useInfo()

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  Notifications.addNotificationResponseReceivedListener(response => {
    const { filename, path } = response.notification.request.content.data;
    console.log(response.notification.request.content)

    Linking.openURL(path)

    //Notification- falta estilizar
  });

  const selectTransaction = (data: ITransactionItemProps) => {
    setSelectedTransaction(data)
    setOpen(true)
  }

  const getReceipt = async (id: string) => {
    setLoading(true)
    try {
      const url = `movimientos/comprobante/${id}`
      const base64Image = await movimientosService.getReceipt(id)
      const filename = `comprobante_${id}.pdf`;
      await saveFilePdf(base64Image, filename, url)
    } catch (e) {
      console.error('error', e);
    } finally {
      setLoading(false)
    }
  }

  //ACA HACIA EL TEMA DE REALM   , capaz tenga q hacer esto
  const checkMovements = () => {
    // setMovementsArs(movementArs[0].movimientos)
    // setMovementsUsd(info3[0].movimientos)
  }

  const checkBalanceCurrency = () => {
    if (!movementArs || !movementUsd) return
    if (currency === 'ARS') {
      return movementArs[0].movimientos[0].balance
    }
    return movementUsd[0].movimientos[0].balance
  }

  const renderItem = ({ item }) => (
    <TransactionItem data={item} selectTransaction={selectTransaction} currency={currency} />
  );

  const getData = () => {
    if (!movementArs || !movementUsd) return
    const arrArs = movementArs[0].movimientos
    const arrUsd = movementUsd[0].movimientos
    if (currency === 'ARS') {
      return arrArs.length !== 0 ? arrArs : [];
    } else {
      return movementUsd[0].length !== 0 ? movementUsd[0].movimientos : [];
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        visible={open}
        transparent={true}
        onRequestClose={() => setOpen(false)}
      >
        {
          selectedTransaction &&
          <LayoutCustom style={themedStyles.centeredView}>
            <LayoutCustom style={themedStyles.modalView}>
              <LayoutCustom mb={theme.margins.large}>
                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.medium }}>Detalles</Text>
                <LayoutCustom style={themedStyles.leftedView} >

                  <LayoutCustom horizontal itemsCenter style={{ width: "100%", justifyContent: "space-between", gap: 20 }}>
                    <Text style={{ ...themedStyles.modalText, fontSize: 16, marginBottom: theme.margins.xSmall }}>Fecha:</Text>
                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 13, textAlign: "right" }}>{selectedTransaction?.date.toString()}</Text>
                  </LayoutCustom>

                  <LayoutCustom horizontal itemsCenter style={{ width: "100%", justifyContent: "space-between", gap: 20 }}>
                    <Text style={{ ...themedStyles.modalText, fontSize: 16, marginBottom: theme.margins.xSmall }}>Importe:</Text>
                    <Text style={{ ...themedStyles.amountText, marginBottom: theme.margins.xSmall, fontSize: 13, color: String(selectedTransaction?.amount)[0] !== "-" ? "green" : "red" }}>{currencyFormat(selectedTransaction?.amount, currency)}</Text>
                  </LayoutCustom>
                  <LayoutCustom horizontal itemsCenter style={{ width: "100%", justifyContent: "space-between", gap: 20 }}>
                    <Text style={{ ...themedStyles.modalText, fontSize: 16, marginBottom: theme.margins.xSmall }}>Descripcion:</Text>
                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 13 }}>{selectedTransaction?.description.slice(0, 20)}</Text>
                  </LayoutCustom>
                  <LayoutCustom horizontal itemsCenter style={{ width: "100%", justifyContent: "space-between", gap: 20 }}>

                    <Text style={{ ...themedStyles.modalText, fontSize: 16, marginBottom: theme.margins.xSmall }}>Comprobante:</Text>
                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 13 }}>{selectedTransaction?.comprobante}</Text>
                  </LayoutCustom>

                </LayoutCustom>
              </LayoutCustom>
              <LayoutCustom>
                <TouchableOpacity
                  style={[themedStyles.button, themedStyles.buttonConfirm]}
                  onPress={() => getReceipt(selectedTransaction?.comprobante)}
                  disabled={loading}
                >
                  {
                    loading ?
                      <ActivityIndicator size={"small"} color={"white"} />
                      :
                      <Text style={themedStyles.textStyle}>Ver</Text>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...themedStyles.button, backgroundColor: loading ? "gray" : "#009F9F" }}
                  onPress={() => setOpen(false)}
                  disabled={loading}
                >
                  <Text style={themedStyles.textStyle}>Volver</Text>
                </TouchableOpacity>
              </LayoutCustom>
            </LayoutCustom>
          </LayoutCustom>
        }
      </Modal>
      <Container style={themedStyles.container}>
        <Header title={'Movimientos'} />
        <LayoutCustom style={themedStyles.content}>
          <LayoutCustom mv={theme.margins.large}>
            <LayoutCustom alignSelfCenter mb={theme.margins.medium}>
              <CurrencyToggle />
            </LayoutCustom>
            <BalanceCard balance={checkBalanceCurrency()} currency={currency} />
          </LayoutCustom>
        </LayoutCustom>
        {
          isLoading ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
              <Image source={require('../../assets/gif/disponibilidad.gif')} style={{ width: 200, height: 200, marginTop: 20 }} />
            </View>
            :
            <LayoutCustom style={{ flex: 1 }} gap={15} ph={theme.paddings.medium} >
              <FlatList
                data={getData()}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            </LayoutCustom>
        }
      </Container>
    </>
  )
}

export default Disponibility

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: theme.colors.background
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
    backgroundColor: theme.colors.background
  },
  content: {
    overflow: 'scroll'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  leftedView: {
    alignItems: 'flex-start',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth * 0.7
  },
  button: {
    borderRadius: 25,
    padding: 15,
    elevation: 2,
    paddingHorizontal: theme.paddings.large
  },
  buttonClose: {
    backgroundColor: '#009F9F'
  },
  buttonConfirm: {
    marginBottom: 5,
    backgroundColor: '#D0682E'
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Lato-Regular'
  },
  amountText: {
    textAlign: "center",
    fontFamily: 'Lato-Regular'
  }
});