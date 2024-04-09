import { StyleService, TopNavigation } from "@ui-kitten/components"
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import React, { useContext, useEffect, useState } from "react"
import { Modal, Pressable, ScrollView, Text } from "react-native"
import RoundedButton from "../../../components/Buttons/RoundedButton"
import Container from "../../../components/Container"
import CurrencyToggle from "../../../components/CurrencyToggle"
import LayoutCustom from "../../../components/LayoutCustom"
import TransactionItem, { ITransactionItemProps } from "../../../components/TransactionItem"
import BalanceCard from "../../../components/cards/BalanceCard"
import { BASE_URL } from "../../../config"
import { AppContext } from "../../../context/AppContext"
import usePromise from "../../../hooks/usePromise"
import authService from "../../../service/auth.service"
import movimientosService from "../../../service/movimientos.service"
import { currencyFormat } from "../../../utils/number"
import theme from "../../../utils/theme"

const Disponibility = () => {
    const { currency } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransactionItemProps | null>(null)
    const [movementsArs, setMovementsArs] = useState([])
    const [movementsUsd, setMovementsUsd] = useState([])
    const [progress, setProgress] = useState<any>()
    const handlePromise = usePromise()

    const selectTransaction = (data: ITransactionItemProps) => {
        setSelectedTransaction(data)
        setOpen(true)
    }
    const getReceipt = async (id: string) => {
        const callback = downloadProgress => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            setProgress({
                downloadProgress: progress,
            });
        };
        try {
            const accessToken = await authService.getAccessToken()
            const downloadResumable = FileSystem.createDownloadResumable(
                `${BASE_URL}/movimientos/comprobante/${id}`,
                FileSystem.documentDirectory + 'comprobante.jpg',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                },
                callback
            );
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
            if (uri) {
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status === 'granted') {
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    const album = await MediaLibrary.getAlbumAsync('Documentos');
                    if (album) {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    } else {
                        await MediaLibrary.createAlbumAsync('Documentos', asset, false);
                    }
                }
            }
        } catch (e) {
            console.error(e);
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
                {
                    Object.keys(selectedTransaction).length !== 0 &&
                    <LayoutCustom style={themedStyles.centeredView}>
                        <LayoutCustom style={themedStyles.modalView}>
                            <LayoutCustom mb={theme.margins.large}>
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.medium }}>Detalle del movimiento</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 26, marginBottom: theme.margins.xSmall }}> Fecha:</Text>
                                <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 18 }}>{selectedTransaction?.date.toString()}</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 26, marginBottom: theme.margins.small }}>Importe:</Text>
                                <Text style={{ ...themedStyles.amountText, marginBottom: theme.margins.xSmall, fontSize: 18, color: String(selectedTransaction?.amount)[0] !== "-" ? "green" : "red" }}>{currencyFormat(selectedTransaction?.amount, currency)}</Text>
                            </LayoutCustom>
                            <LayoutCustom>
                                <Pressable
                                    style={[themedStyles.button, themedStyles.buttonConfirm]}
                                    onPress={() => getReceipt(selectedTransaction?.comprobante)}
                                >
                                    <Text style={themedStyles.textStyle}>Ver</Text>
                                </Pressable>
                                <Pressable
                                    style={[themedStyles.button, themedStyles.buttonClose]}
                                    onPress={() => setOpen(false)}
                                >
                                    <Text style={themedStyles.textStyle}>Volver</Text>
                                </Pressable>
                            </LayoutCustom>
                        </LayoutCustom>
                    </LayoutCustom>
                }
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
                            <CurrencyToggle />
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
        backgroundColor: '#009F9F'
    },
    buttonConfirm: {
        marginBottom: 5,
        backgroundColor: '#D0682E'
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