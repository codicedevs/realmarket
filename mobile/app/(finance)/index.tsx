import AsyncStorage from "@react-native-async-storage/async-storage"
import { StyleService, TopNavigation } from "@ui-kitten/components"
import { router, useFocusEffect } from "expo-router"
import React, { useCallback, useContext, useState } from "react"
import { Dimensions, ScrollView, Text, View } from "react-native"
import RoundedButton from "../../components/Buttons/RoundedButton"
import Container from "../../components/Container"
import CurrencyToggle from "../../components/CurrencyToggle"
import LayoutCustom from "../../components/LayoutCustom"
import FolderCard from "../../components/cards/FolderCard"
import { IPosition } from "../../components/cards/TransactionCards"
import { AppContext } from "../../context/AppContext"
import theme from "../../utils/theme"
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const mockData = [
    {
        "cuenta": "423000005",
        "fecha": null,
        "tipoTitulo": "Moneda",
        "tipoTituloAgente": "",
        "codigoISIN": "",
        "especie": "ARS",
        "nombreEspecie": "Peso",
        "simboloLocal": "",
        "lugar": "Local",
        "subCuenta": "GRAL",
        "estado": "DIS",
        "cantidadLiquidada": -123781400.62,
        "cantidadPendienteLiquidar": 0,
        "precio": 1,
        "precioUnitario": 1,
        "monedaCotizacion": "ARS",
        "fechaPrecio": "19/03/2024",
        "parking": null
    },
    {
        "cuenta": "423000005",
        "fecha": null,
        "tipoTitulo": "Acciones",
        "tipoTituloAgente": "",
        "codigoISIN": "ARP331091024",
        "especie": "00274",
        "nombreEspecie": "CRESUD S.A. ORD. 1 VOTO ESCRIT.",
        "simboloLocal": "CRES",
        "lugar": "CV",
        "subCuenta": "CVCUS",
        "estado": "DIS",
        "cantidadLiquidada": -4050,
        "cantidadPendienteLiquidar": 0,
        "precio": 897.05,
        "precioUnitario": 897.05,
        "monedaCotizacion": "ARS",
        "fechaPrecio": "18/03/2024",
        "parking": null
    }
]

const Finance = () => {
    const [positions, setPositions] = useState([])
    const [info, setInfo] = useState({})
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

    const getData = async () => {
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
            setInfo({
                ACC: acciones,
                CED: cedears,
                OBG: obligaciones,
                TIT: formatPublicTitles(titulos),
                PAG: pagare,
                MON: monedas
            })
        }
    }

    const checkData = () => {
        if (positions.length !== 0) {
            return positions
        }
        return mockData
    }

    useFocusEffect(
        useCallback(() => {
            getData()
        }, [])
    )

    return (
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
                    <CurrencyToggle onChange={getData} />
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
                        Object.keys(info).length !== 0 ?
                            Object.keys(info).map((i, index) => {
                                return <FolderCard title={i} data={info[i]} currency={currency} key={index} />
                            })
                            :
                            null
                    }
                </ScrollView>
            </View>
        </Container>
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
    }
});
