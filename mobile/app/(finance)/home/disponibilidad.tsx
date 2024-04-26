import { useQuery } from "@realm/react"
import { StyleService } from "@ui-kitten/components"
import React, { useContext, useEffect, useState } from "react"
import { Dimensions, Modal, Pressable, ScrollView, Text } from "react-native"
import { ContainerArs, ContainerUsd } from "../../../Realm/Schemas"
import Container from "../../../components/Container"
import CurrencyToggle from "../../../components/CurrencyToggle"
import Header from "../../../components/CustomHeader"
import LayoutCustom from "../../../components/LayoutCustom"
import TransactionItem, { ITransactionItemProps } from "../../../components/TransactionItem"
import BalanceCard from "../../../components/cards/BalanceCard"
import { AppContext } from "../../../context/AppContext"
import usePromise from "../../../hooks/usePromise"
import movimientosService from "../../../service/movimientos.service"
import { currencyFormat } from "../../../utils/number"
import theme from "../../../utils/theme"
const windowWidth = Dimensions.get("window").width;

const Disponibility = () => {
    const info3 = useQuery(ContainerUsd)
    const info2 = useQuery(ContainerArs)
    const { currency } = useContext(AppContext)
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
        const [res, resUsd] = await Promise.all([
            movimientosService.getMovementsArs(),
            movimientosService.getMovementsUsd()
        ])
        setMovementsArs(res.data.reverse())
        setMovementsUsd(resUsd.data.reverse())
    }

    const checkMovements = () => {
        if (info2 !== undefined && info3 !== undefined) {
            const processInChunks = (movements, setFunction) => {
                let index = 0;
                const chunkSize = 10; // Procesar de 10 en 10

                const interval = setInterval(() => {
                    // Tomar un 'chunk' de los movimientos
                    const chunk = movements.slice(index, index + chunkSize).map(item => ({ ...item }));

                    // Actualizar el estado con el nuevo 'chunk'
                    setFunction(prevMovements => [...prevMovements, ...chunk]);

                    // Incrementar el índice para el siguiente chunk
                    index += chunkSize;

                    // Si hemos procesado todos los movimientos, detener el intervalo
                    if (index >= movements.length) clearInterval(interval);
                }, 100); // Esperar 100 ms antes de procesar el siguiente chunk
            };

            // Llamar a processInChunks para cada tipo de movimiento
            processInChunks(info2[0].movimientos, setMovementsArs);
            processInChunks(info3[0].movimientos, setMovementsUsd);
        }
    }

    const getInfo = async () => {
        // await handlePromise(promises())
        checkMovements()
    }

    const checkBalanceCurrency = () => {
        if (movementsArs.length === 0 || movementsUsd.length === 0) return
        if (currency === 'ARS') {
            return movementsArs[0].balance
        }
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
                    Object.keys(selectedTransaction).length !== 0 &&
                    <LayoutCustom style={themedStyles.centeredView}>
                        <LayoutCustom style={themedStyles.modalView}>
                            <LayoutCustom mb={theme.margins.large}>
                                <Text style={{ ...themedStyles.modalText, fontSize: 25, marginBottom: theme.margins.medium, fontWeight: '400' }}>Detalle del movimiento</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.xSmall, fontWeight: '400' }}> Fecha:</Text>
                                <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 18 }}>{selectedTransaction?.date}</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small, fontWeight: '400' }}>Importe:</Text>
                                <Text style={{ ...themedStyles.amountText, marginBottom: theme.margins.xSmall, fontSize: 18, color: String(selectedTransaction?.amount)[0] !== "-" ? "green" : "red" }}>{currencyFormat(selectedTransaction?.amount, currency)}</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small, fontWeight: '400' }}>Descripcion:</Text>
                                <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 18 }}>{selectedTransaction?.description.slice(0, 20)}</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small, fontWeight: '400' }}>Comprobante:</Text>
                                <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 18 }}>{selectedTransaction?.comprobante}</Text>
                            </LayoutCustom>
                            <Pressable
                                style={[themedStyles.button, themedStyles.buttonClose]}
                                onPress={() => setOpen(false)}
                            >
                                <Text style={themedStyles.textStyle}>Volver</Text>
                            </Pressable>
                        </LayoutCustom>
                    </LayoutCustom>
                }
            </Modal>
            <Container style={themedStyles.container}>
                {/* <TopNavigation
                    alignment="center"
                    title="Movimientos"
                    style={themedStyles.topNavigation}
                    accessoryLeft={() => (
                        <RoundedButton icon="arrow-back-outline" />
                    )}
                    accessoryRight={() => <RoundedButton icon="person-outline" />}
                /> */}
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
        width: windowWidth * 0.7
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