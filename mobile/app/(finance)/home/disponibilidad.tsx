import { StyleService, TopNavigation } from "@ui-kitten/components"
import React, { useEffect, useState } from "react"
import { ImageSourcePropType, Modal, Pressable, ScrollView, Text } from "react-native"
import RoundedButton from "../../../components/Buttons/RoundedButton"
import Container from "../../../components/Container"
import CurrencyToggle from "../../../components/CurrencyToggle"
import LayoutCustom from "../../../components/LayoutCustom"
import TransactionItem from "../../../components/TransactionItem"
import BalanceCard from "../../../components/cards/BalanceCard"
import usePromise from "../../../hooks/usePromise"
import movimientosService from "../../../service/movimientos.service"
import theme from "../../../utils/theme"

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
    const [open, setOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransactionItemProps | {}>({})
    const [movementsArs, setMovementsArs] = useState([])
    const [movementsUsd, setMovementsUsd] = useState([])
    const handlePromise = usePromise()

    const selectTransaction = (data: ITransactionItemProps) => {
        setSelectedTransaction(data)
        setOpen(true)
    }

    const promises = async () => {
        const res = await movimientosService.getMovementsArs()
        const resUsd = await movimientosService.getMovementsUsd()
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
            return initialValue.balance
        }
        const initialValue = movementsUsd.find(transaction => transaction.description === "Saldo Inicial");
        return initialValue.balance
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
                <LayoutCustom style={themedStyles.centeredView}>
                    <LayoutCustom style={themedStyles.modalView}>
                        <LayoutCustom mb={theme.margins.large}>
                            <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.medium }}>Detalle del movimiento</Text>
                            <Text style={{ ...themedStyles.modalText, fontSize: 26, marginBottom: theme.margins.xSmall }}> Fecha:</Text>
                            {/* <Text marginBottom={theme.margins.xSmall} fontSize={18} style={themedStyles.modalText}>{selectedTransaction.created_at ?? (selectedTransaction.created_at).toISOString()}</Text> */}
                            <Text style={{ ...themedStyles.modalText, fontSize: 26, marginBottom: theme.margins.small }}>Importe:</Text>
                            {/* <Text marginBottom={theme.margins.xSmall} style={themedStyles.amountText} fontSize={18} status={selectedTransaction.amount[0] !== "-" ? "success-dark" : "danger"}>{selectedTransaction.amount}</Text> */}
                            <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall }}>CAUCION TOMADORA</Text>
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
                    <LayoutCustom mv={theme.margins.large}>
                        <LayoutCustom alignSelfCenter mb={theme.margins.medium}>
                            <CurrencyToggle changeCurrency={setCurrency} />
                        </LayoutCustom>
                        <BalanceCard balance={checkBalanceCurrency()} grow={12.2} />
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