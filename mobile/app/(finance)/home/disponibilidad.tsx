import { StyleService } from "@ui-kitten/components"
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity } from "react-native"
import Container from "../../../components/Container"
import CurrencyToggle from "../../../components/CurrencyToggle"
import Header from "../../../components/CustomHeader"
import LayoutCustom from "../../../components/LayoutCustom"
import TransactionItem, { ITransactionItemProps } from "../../../components/TransactionItem"
import BalanceCard from "../../../components/cards/BalanceCard"
import { AppContext } from "../../../context/AppContext"
import { useLoading } from "../../../context/LoadingProvider"
import usePromise from "../../../hooks/usePromise"
import movimientosService from "../../../service/movimientos.service"
import { currencyFormat } from "../../../utils/number"
import { saveFilePdf } from "../../../utils/saveFile"
import theme from "../../../utils/theme"

const Disponibility = () => {
    const { currency } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransactionItemProps>(null)
    const [movementsArs, setMovementsArs] = useState([])
    const [movementsUsd, setMovementsUsd] = useState([])
    const handlePromise = usePromise()
    const { setLoadingScreen } = useLoading()
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        try {
            const url = `movimientos/comprobante/${id}`
            const base64Image = await movimientosService.getReceipt(id)
            const filename = `comprobante_${id}.pdf`;
            await saveFilePdf(base64Image, filename, url)
        } catch (e) {
            console.error('error', e);
        } finally {
            setIsLoading(false)
        }
    }

    const promises = async () => {
        const [res, resUsd] = await Promise.all([
            movimientosService.getMovementsArs(),
            movimientosService.getMovementsUsd()
        ])
        setMovementsArs(res.data.reverse())
        setMovementsUsd(resUsd.data.reverse())
    }

    const getInfo = async () => {
        await handlePromise(promises())
    }

    const checkBalanceCurrency = () => {
        if (movementsArs.length === 0) return
        if (movementsUsd.length === 0) return
        if (currency === 'ARS') {
            const initialValue = movementsArs.find(transaction => transaction.description === "Saldo Inicial");
            return movementsArs[0].balance
        }
        const initialValue = movementsUsd.find(transaction => transaction.description === "Saldo Inicial");
        return movementsUsd[0].balance
    }

    useEffect(() => {
        getInfo()
    }, [])

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
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.medium }}>Detalle del movimiento</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 23, marginBottom: theme.margins.xSmall }}> Fecha:</Text>
                                <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 18 }}>{selectedTransaction?.date.toString()}</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 23, marginBottom: theme.margins.small }}>Importe:</Text>
                                <Text style={{ ...themedStyles.amountText, marginBottom: theme.margins.xSmall, fontSize: 18, color: String(selectedTransaction?.amount)[0] !== "-" ? "green" : "red" }}>{currencyFormat(selectedTransaction?.amount, currency)}</Text>
                            </LayoutCustom>
                            <LayoutCustom>
                                <TouchableOpacity
                                    style={[themedStyles.button, themedStyles.buttonConfirm]}
                                    onPress={() => getReceipt(selectedTransaction?.comprobante)}
                                    disabled={isLoading}
                                >
                                    {
                                        isLoading ?
                                            <ActivityIndicator size={"small"} color={"white"} />
                                            :
                                            <Text style={themedStyles.textStyle}>Ver</Text>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ ...themedStyles.button, backgroundColor: isLoading ? "gray" : "#009F9F" }}
                                    onPress={() => setOpen(false)}
                                    disabled={isLoading}
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
                <LayoutCustom overflow="scroll" gap={15} ph={theme.paddings.medium} >
                    <ScrollView>
                        {
                            currency === 'ARS' ?
                                movementsArs.length !== 0 ?
                                    movementsArs.map((t, i) => {
                                        return <TransactionItem data={t} key={i} selectTransaction={selectTransaction} currency={currency} />
                                    })
                                    :
                                    null
                                :
                                movementsUsd.length !== 0 ?
                                    movementsUsd.map((t, i) => {
                                        return <TransactionItem data={t} key={i} selectTransaction={selectTransaction} currency={currency} />
                                    })
                                    :
                                    null
                        }
                    </ScrollView>
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