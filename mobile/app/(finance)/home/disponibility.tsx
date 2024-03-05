import React, { useState } from "react"
import { ImageSourcePropType, Modal, Pressable, View } from "react-native"
import Container from "../../../components/Container"
import { StyleService, TopNavigation } from "@ui-kitten/components"
import RoundedButton from "../../../components/Buttons/RoundedButton"
import LayoutCustom from "../../../components/LayoutCustom"
import theme from "../../../utils/theme"
import CurrencyToggle from "../../../components/CurrencyToggle"
import BalanceCard from "../../../components/cards/BalanceCard"
import TransactionItem from "../../../components/TransactionItem"
import Text from "../../../components/Text"

export interface ITransactionItemProps {
    image?: ImageSourcePropType | undefined;
    title: string;
    created_at: Date;
    amount: string;
    receivedBy?: string;
    total?: string
  }
  

const Disponibility = () => {
    const [currency, setCurrency] = useState('ARS')
    const [open,setOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransactionItemProps | {}>({})

    const selectTransaction = (data: ITransactionItemProps) => {
        setSelectedTransaction(data)
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
                <LayoutCustom style={themedStyles.centeredView}>
                    <LayoutCustom style={themedStyles.modalView}>
                        <LayoutCustom mb={theme.margins.large}>
                            <Text marginBottom={theme.margins.medium} fontSize={20} style={themedStyles.modalText}>Detalle del movimiento</Text>
                            <Text category="subhead" marginBottom={theme.margins.xSmall} fontSize={16} style={themedStyles.modalText}> Fecha:</Text>
                            {/* <Text marginBottom={theme.margins.xSmall} fontSize={18} style={themedStyles.modalText}>{selectedTransaction.created_at ?? (selectedTransaction.created_at).toISOString()}</Text> */}
                            <Text category="subhead" marginBottom={theme.margins.small} fontSize={16} style={themedStyles.modalText}>Importe:</Text>
                            {/* <Text marginBottom={theme.margins.xSmall} style={themedStyles.amountText} fontSize={18} status={selectedTransaction.amount[0] !== "-" ? "success-dark" : "danger"}>{selectedTransaction.amount}</Text> */}
                            <Text marginBottom={theme.margins.xSmall} style={themedStyles.modalText}>CAUCION TOMADORA</Text>
                        </LayoutCustom>
                        <Pressable
                            style={[themedStyles.button, themedStyles.buttonClose]}
                            onPress={() => setOpen(false)}
                        >
                            <Text style={themedStyles.textStyle}>Volver</Text>
                        </Pressable>
                    </LayoutCustom>
                </LayoutCustom>
            </Modal>
            <Container style={themedStyles.container}>
                <TopNavigation
                    alignment="center"
                    title="Movimientos"
                    style={themedStyles.topNavigation}
                    accessoryLeft={() => (
                        <RoundedButton icon="arrow-back-outline" />
                    )}
                    accessoryRight={() => <RoundedButton icon="person-outline" />}
                />
                <LayoutCustom style={themedStyles.content}>
                    <LayoutCustom mt={theme.margins.large} mb={theme.margins.small}>
                        <LayoutCustom alignSelfCenter mb={theme.margins.medium}>
                            <CurrencyToggle changeCurrency={setCurrency} />
                        </LayoutCustom>
                        <BalanceCard balance={233004.91} grow={12.2} />
                    </LayoutCustom>
                    <LayoutCustom overflow="scroll" gap={15} mh={theme.margins.medium}>
                        {SAMPLE_TRANSACTION.map((transaction, index) => {
                            return <TransactionItem data={transaction} key={index} selectTransaction={selectTransaction}  />;
                        })}
                    </LayoutCustom>
                </LayoutCustom>
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
    },
    button: {
      borderRadius: 25,
      padding: 15,
      elevation: 2,
      paddingHorizontal: theme.paddings.large
    },
    buttonClose: {
      backgroundColor: '#009F9F',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      textAlign: 'center',
      color: 'black'
    },
    amountText: {
      textAlign: "center"
    }
});

const SAMPLE_TRANSACTION = [
    {
        image: require("../../../assets/img_prime.png"),
        title: "Venta",
        created_at: new Date(new Date().setHours(new Date().getHours())),
        amount: "-$5000",
        receivedBy: '[MRCAO]',
        total: "$1.345.000,00"
    },
    {
        image: require("../../../assets/img_nike.png"),
        title: "Caución tomadora",
        created_at: new Date(new Date().setHours(new Date().getHours()) - 1),
        amount: "-$50.000",
        receivedBy: '2023065826',
        total: "1.350.000,00"
    },
    {
        title: "male",
        created_at: new Date(new Date().setHours(new Date().getHours()) - 2),
        amount: "$50.000",
        total: "$1.400.000,00"
    },
    {
        title: 'Ret. gcias. s/CL',
        created_at: new Date(new Date().setHours(new Date().getHours()) - 4),
        amount: "$15000",
        total: "1.350.000,00"
    }
];