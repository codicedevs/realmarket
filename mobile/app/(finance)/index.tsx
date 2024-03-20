import AsyncStorage from "@react-native-async-storage/async-storage"
import { StyleService, TopNavigation } from "@ui-kitten/components"
import { router, useFocusEffect } from "expo-router"
import React, { useCallback, useContext, useState } from "react"
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from "react-native"
import RoundedButton from "../../components/Buttons/RoundedButton"
import Container from "../../components/Container"
import CurrencyToggle from "../../components/CurrencyToggle"
import LayoutCustom from "../../components/LayoutCustom"
import FolderCard from "../../components/cards/FolderCard"
import { IPosition } from "../../components/cards/TransactionCards"
import { AppContext } from "../../context/AppContext"
import theme from "../../utils/theme"
const windowWidth = Dimensions.get("window").width;

const Finance = () => {
    const [assetsInfo, setAssetsInfo] = useState({})
    const [open, setOpen] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<IPosition | {}>({})
    const { currency } = useContext(AppContext)
    const configRoute = () => {
        router.replace('config')
    }

    const formatPublicTitles = (data: IPosition[]) => {
        const newData = data.map((d) => ({
            ...d,
            simboloLocal: d.simboloLocal.concat(d.lugar)
        }))

        return newData
    }

    const selectAsset = (data: IPosition) => {
        setSelectedAsset(data)
        setOpen(true)
    }

    const fetchAndOrganizePositions = async () => {
        const value = await AsyncStorage.getItem('positions')
        if (value) {
            const positions = JSON.parse(value);
            //const echeqs = positions.filter((position) => position.tipoTitulo === "ECHEQ")
            const acciones = positions.filter((position) => position.tipoTitulo === "Acciones" && position.monedaCotizacion.includes(currency))
            const cedears = positions.filter((position) => position.tipoTitulo === "Cedears" && position.monedaCotizacion.includes(currency))
            const obligaciones = positions.filter((position) => position.tipoTitulo === "Obligaciones Negociables" && position.monedaCotizacion.includes(currency))
            const titulos = positions.filter((position) => position.tipoTitulo === "Títulos Públicos" && position.monedaCotizacion.includes(currency))
            const pagare = positions.filter((position) => position.tipoTitulo === "Pagarés" && position.monedaCotizacion.includes(currency))
            const monedas = positions.filter((position) => position.tipoTitulo === "Moneda" && position.monedaCotizacion.includes(currency))
            formatPublicTitles(titulos)
            setAssetsInfo({
                ACC: acciones,
                CED: cedears,
                OBG: obligaciones,
                TIT: formatPublicTitles(titulos),
                PAG: pagare,
                MON: monedas
            })
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchAndOrganizePositions()
        }, [])
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
                                Object.keys(selectedAsset).length !== 0 &&
                                <>
                                    <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.medium }}>Detalles</Text>
                                    <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.xSmall }}> Tipo:</Text>
                                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 16 }}>{selectedAsset?.tipoTitulo}</Text>
                                    <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small }}>Nombre:</Text>
                                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 16 }}>{selectedAsset?.nombreEspecie.slice(0, 20)}</Text>
                                    <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small }}>Codigo:</Text>
                                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 16 }}>{selectedAsset?.simboloLocal}</Text>
                                    <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small }}>Lugar:</Text>
                                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 16 }}>{selectedAsset?.lugar}</Text>
                                    <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small }}>Estado:</Text>
                                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 16 }}>{selectedAsset?.estado}</Text>
                                    <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small }}>Cantidad:</Text>
                                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 16 }}>{selectedAsset?.cantidadPendienteLiquidar - selectedAsset?.cantidadLiquidada}</Text>
                                    <Text style={{ ...themedStyles.modalText, fontSize: 20, marginBottom: theme.margins.small }}>Importe:</Text>
                                    <Text style={{ ...themedStyles.modalText, marginBottom: theme.margins.xSmall, fontSize: 16 }}>{(selectedAsset?.cantidadPendienteLiquidar - selectedAsset?.cantidadLiquidada) * selectedAsset.precioUnitario}</Text>
                                </>
                            }
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
                    title="Posiciones"
                    style={themedStyles.topNavigation}
                    accessoryLeft={() => (
                        <RoundedButton icon="arrow-back-outline" />
                    )}
                    accessoryRight={() => <RoundedButton onPress={() => configRoute()} icon="person-outline" />}
                />
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
                            <Text style={themedStyles.textColor}>Total general</Text>
                            <Text style={themedStyles.textColor}>AR$1.456.789,000</Text>
                        </LayoutCustom>
                    </LayoutCustom>
                    <LayoutCustom ph={theme.paddings.large}>
                        <LayoutCustom horizontal justify="space-between" pv={theme.paddings.xSmall} mt={theme.margins.medium} style={themedStyles.tableTitle}>
                            <LayoutCustom style={themedStyles.invisibleTitle}>
                            </LayoutCustom>
                            <LayoutCustom alignSelfCenter style={themedStyles.smallerTitle}>
                                <Text style={themedStyles.textColor}>Nombre</Text>
                            </LayoutCustom>
                            <LayoutCustom alignSelfCenter itemsCenter style={themedStyles.smallerTitle}>
                                <Text style={themedStyles.textColor}>Valor</Text>
                            </LayoutCustom>
                            <LayoutCustom style={themedStyles.biggerTitle}>
                                <Text style={themedStyles.textColor}>Total</Text>
                                <Text style={themedStyles.textColor}>Cantidad</Text>
                            </LayoutCustom>
                        </LayoutCustom>
                    </LayoutCustom>
                </LayoutCustom>
                <View style={themedStyles.scrollContainer}>
                    <ScrollView>
                        {
                            Object.keys(assetsInfo).length !== 0 ?
                                Object.keys(assetsInfo).map((i, index) => {
                                    return <FolderCard title={i} data={assetsInfo[i]} selectAsset={selectAsset} key={index} />
                                })
                                :
                                null
                        }
                    </ScrollView>
                </View>
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
        minWidth: '20%'
    },
    smallerTitle: {
        width: "25%"
    },
    biggerTitle: {
        width: '30%',
        alignItems: "flex-end"
    },
    textColor: {
        color: "white"
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
        backgroundColor: '#009F9F',
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
