import { StyleService } from "@ui-kitten/components"
import { useFocusEffect } from "expo-router"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Dimensions, FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native"
import Container from "../../components/Container"
import CurrencyToggle from "../../components/CurrencyToggle"
import Header from "../../components/CustomHeader"
import LayoutCustom from "../../components/LayoutCustom"
import FolderCard from "../../components/cards/FolderCard"
import { IPosition } from "../../components/cards/TransactionCards"
import { AppContext } from "../../context/AppContext"
import { useInfo } from "../../context/InfoProvider"
import { useLoading } from "../../context/LoadingProvider"
import { financial } from "../../types/financial.types"
import { currencyFormat } from "../../utils/number"
import theme from "../../utils/theme"
const windowWidth = Dimensions.get("window").width;

const Finance = () => {
    const [assetsInfo, setAssetsInfo] = useState({})
    const [open, setOpen] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<IPosition>(null)
    const { currency } = useContext(AppContext)
    const amount = selectedAsset?.cantidadPendienteLiquidar - selectedAsset?.cantidadLiquidada
    const { isLoading } = useLoading()
    const { currencyPositions } = useInfo()

    const selectAsset = (data: IPosition) => {
        setSelectedAsset(data)
        setOpen(true)
    }

    const fetchAndOrganizePositions = async () => {
        if (currencyPositions && currencyPositions.posiciones) {
            const assetsInfo = Object.keys(financial).reduce((acc, key) => {
                const tipoTitulo = financial[key as keyof typeof financial];
                acc[key] = currencyPositions.posiciones.filter(position =>
                    position.tipoTitulo === tipoTitulo && position.monedaCotizacion.includes(currency)
                );
                return acc;
            }, {} as Record<keyof typeof financial, any[]>);
            setAssetsInfo(assetsInfo);
        }
    }

    useEffect(() => {
        fetchAndOrganizePositions()
    }, [currencyPositions])

    const renderFolderCard = ({ item, index }) => (
        <FolderCard title={item.title} data={item.data} selectAsset={selectAsset} key={index} />
    );

    const folderData = Object.keys(assetsInfo).map((key) => ({
        title: key,
        data: assetsInfo[key]
    }));

    useFocusEffect(
        useCallback(() => {
            fetchAndOrganizePositions()
        }, [currency])
    )

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
                            {
                                selectedAsset &&
                                <>
                                    <Text style={[themedStyles.modalText, themedStyles.modalTextTitle]}>Detalles</Text>
                                    <LayoutCustom horizontal itemsCenter>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextSubTitle]}>Nombre:</Text>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextInfo, themedStyles.withMargin]}>{selectedAsset.nombreEspecie.slice(0, 20)}</Text>
                                    </LayoutCustom>
                                    <LayoutCustom horizontal itemsCenter>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextSubTitle]}>Código:</Text>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextInfo, themedStyles.withMargin]}>{selectedAsset.simboloLocal}</Text>
                                    </LayoutCustom>
                                    <LayoutCustom horizontal itemsCenter>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextSubTitle]}>Lugar:</Text>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextInfo, themedStyles.withMargin]}>{selectedAsset.lugar}</Text>
                                    </LayoutCustom>
                                    <LayoutCustom horizontal itemsCenter>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextSubTitle]}>Estado:</Text>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextInfo, themedStyles.withMargin]}>{selectedAsset.estado}</Text>
                                    </LayoutCustom>
                                    <LayoutCustom horizontal itemsCenter>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextSubTitle]}>Cantidad:</Text>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextInfo, themedStyles.withMargin]}>{amount}</Text>
                                    </LayoutCustom>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextSubTitle]}>Importe:</Text>
                                        <Text style={[themedStyles.modalText, themedStyles.modalTextInfo, themedStyles.withMargin]}>{currencyFormat((selectedAsset.cantidadPendienteLiquidar - selectedAsset.cantidadLiquidada) * selectedAsset.precioUnitario, currency)}</Text>
                                    </View>
                                    {
                                        selectedAsset.tipoTitulo === 'Pagarés' &&
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[themedStyles.modalText, themedStyles.modalTextSubTitle]}>P.unitario:</Text>
                                            <Text style={[themedStyles.modalText, themedStyles.modalTextInfo, themedStyles.withMargin]}>{currencyFormat(selectedAsset.precioUnitario, 'ARS')}</Text>
                                        </View>
                                    }
                                </>
                            }
                        </LayoutCustom>
                        <TouchableOpacity
                            style={[themedStyles.button, themedStyles.buttonClose]}
                            onPress={() => setOpen(false)}
                        >
                            <Text style={themedStyles.textStyle}>Volver</Text>
                        </TouchableOpacity>
                    </LayoutCustom>
                </LayoutCustom>
            </Modal>
            <Container style={themedStyles.container}>
                <Header title={'Posiciones'} />
                <LayoutCustom>
                    <LayoutCustom mt={theme.margins.large} mb={theme.margins.medium} alignSelfCenter>
                        <CurrencyToggle onChange={fetchAndOrganizePositions} />
                    </LayoutCustom>
                    <LayoutCustom
                        ph={theme.paddings.medium}
                    >
                        <LayoutCustom
                            horizontal
                            justify="space-between"
                        >
                            <Text style={themedStyles.textColor}>{`Total general`}</Text>
                            <Text style={themedStyles.textColor}>{currencyFormat(currencyPositions?.arsPositions, 'ARS')}</Text>
                        </LayoutCustom>
                    </LayoutCustom>
                    <LayoutCustom ph={theme.paddings.large}>
                        <LayoutCustom horizontal justify="space-between" pv={theme.paddings.xSmall} mt={theme.margins.medium} style={themedStyles.tableTitle}>
                            <LayoutCustom style={themedStyles.invisibleTitle}>
                            </LayoutCustom>
                            <LayoutCustom alignSelfCenter style={themedStyles.smallerTitle}>
                                <Text style={themedStyles.titleTable}>Nombre</Text>
                            </LayoutCustom>
                            <LayoutCustom alignSelfCenter itemsCenter style={themedStyles.smallerTitle}>
                                <Text style={themedStyles.titleTable}>Valor</Text>
                            </LayoutCustom>
                            <LayoutCustom style={themedStyles.biggerTitle}>
                                <Text style={themedStyles.titleTable}>Total</Text>
                                <Text style={themedStyles.titleTable}>Cantidad</Text>
                            </LayoutCustom>
                        </LayoutCustom>
                    </LayoutCustom>
                </LayoutCustom>
                {
                    isLoading ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={require('../../assets/gif/Statistics.gif')} style={{ width: 250, height: 250, marginTop: 20 }} />
                        </View>
                        :
                        <View style={themedStyles.scrollContainer}>
                            <FlatList
                                data={folderData}
                                renderItem={renderFolderCard}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                }
            </Container>
        </>
    )
}

export default Finance

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    topNavigation: {
        paddingHorizontal: theme.paddings.medium,
        backgroundColor: theme.colors.background
    },
    tableTitle: {
        width: '100%'
    },
    invisibleTitle: {
        minWidth: '10%'
    },
    smallerTitle: {
        width: "25%"
    },
    biggerTitle: {
        width: '30%',
        alignItems: "flex-end"
    },
    textColor: {
        color: "white",
        fontFamily: 'Lato-Regular'
    },
    titleTable: {
        color: 'white',
        fontFamily: 'Lato-Bold'
    },
    scrollContainer: {
        flex: 1,
        marginHorizontal: theme.paddings.medium
    },
    button: {
        borderRadius: 25,
        padding: 15,
        elevation: 2,
        paddingHorizontal: theme.paddings.large
    },
    buttonClose: {
        backgroundColor: theme.colors.background,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
        width: windowWidth * 0.8,
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
    modalText: {
        textAlign: 'center',
        color: 'black'
    },
    modalTextTitle: {
        fontSize: 22,
        marginBottom: theme.margins.medium,
        fontFamily: 'Lato-Bold'
    },
    modalTextSubTitle: {
        fontSize: 16,
        marginBottom: theme.margins.xSmall,
        fontFamily: 'Lato-Bold'
    },
    modalTextInfo: {
        fontSize: 14,
        marginBottom: theme.margins.xSmall,
        fontFamily: 'Lato-Regular'
    },
    withMargin: {
        marginLeft: theme.margins.xSmall
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Lato-Bold'
    }
});
