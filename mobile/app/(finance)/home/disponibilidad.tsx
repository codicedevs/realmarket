import { useQuery } from "@realm/react"
import { StyleService } from "@ui-kitten/components"
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import React, { useContext, useState } from "react"
import { ActivityIndicator, Dimensions, FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native"
import { ContainerArs, ContainerUsd } from "../../../Realm/Schemas"
import Container from "../../../components/Container"
import CurrencyToggle from "../../../components/CurrencyToggle"
import Header from "../../../components/CustomHeader"
import LayoutCustom from "../../../components/LayoutCustom"
import TransactionItem, { ITransactionItemProps } from "../../../components/TransactionItem"
import BalanceCard from "../../../components/cards/BalanceCard"
import { AppContext } from "../../../context/AppContext"
import { useInfo } from "../../../context/InfoProvider"
import { useLoading } from "../../../context/LoadingProvider"
import movimientosService from "../../../service/movimientos.service"
import { currencyFormat } from "../../../utils/number"
import { saveFilePdf } from "../../../utils/saveFile"
import theme from "../../../utils/theme"
const windowWidth = Dimensions.get("window").width;

const Disponibility = () => {
    const info3 = useQuery(ContainerUsd)
    const info2 = useQuery(ContainerArs)
    const { currency } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<ITransactionItemProps>(null)
    const [movementsArs, setMovementsArs] = useState([])
    const [movementsUsd, setMovementsUsd] = useState([])
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

    //ACA HACIA EL TEMA DE REALM   
    const checkMovements = () => {
        setMovementsArs(info2[0].movimientos)
        setMovementsUsd(info3[0].movimientos)
    }

    const getInfo = async () => {
        // await handlePromise(promises())
        checkMovements()
    }
    //
    const checkBalanceCurrency = () => {
        if (!movements) return
        if (currency === 'ARS') {
            const initialValue = movements.movementsArs.find(transaction => transaction.description === "Saldo Inicial");
            return movements.movementsArs[0].balance
        }
        const initialValue = movements.movementsUsd.find(transaction => transaction.description === "Saldo Inicial");
        return movements.movementsUsd[0].balance
    }

    const renderItem = ({ item }) => (
        <TransactionItem data={item} selectTransaction={selectTransaction} currency={currency} />
    );

    const getData = () => {
        if (!movements) return
        if (currency === 'ARS') {
            return movements.movementsArs?.length !== 0 ? movements.movementsArs : [];
        } else {
            return movements.movementsUsd?.length !== 0 ? movements.movementsUsd : [];
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
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.medium }}>Detalle del movimiento</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 23, marginBottom: theme.margins.xSmall }}> Fecha:</Text>
                                <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 18 }}>{selectedTransaction?.date.toString()}</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 23, marginBottom: theme.margins.small }}>Importe:</Text>
                                <Text style={{ ...themedStyles.amountText, marginBottom: theme.margins.xSmall, fontSize: 18, color: String(selectedTransaction?.amount)[0] !== "-" ? "green" : "red" }}>{currencyFormat(selectedTransaction?.amount, currency)}</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small, fontWeight: '400' }}>Descripcion:</Text>
                                <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 18 }}>{selectedTransaction?.description.slice(0, 20)}</Text>
                                <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small, fontWeight: '400' }}>Comprobante:</Text>
                                <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 18 }}>{selectedTransaction?.comprobante}</Text>
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
                            <Image source={require('../../../assets/gif/disponibilidad.gif')} style={{ width: 200, height: 200, marginTop: 20 }} />
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