import React, { memo, useContext } from "react";
// ----------------------------- UI kitten -----------------------------------
import {
    Avatar,
    StyleService,
    useStyleSheet
} from "@ui-kitten/components";
// ----------------------------- Lodash -----------------------------------
import { Text, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/AppContext";
import { currencyFormat } from "../../utils/number";
import theme from "../../utils/theme";
import AnimatedAppearance, { Animation_Types_Enum } from "../AnimatedAppearance";
import LayoutCustom from "../LayoutCustom";

export interface IPosition {
    cuenta: string;
    fecha: string | null;
    tipoTitulo: string;
    tipoTituloAgente: string;
    codigoISIN: string;
    especie: string;
    nombreEspecie: string;
    simboloLocal: string;
    lugar: string;
    subCuenta: string;
    estado: string;
    cantidadLiquidada: number;
    cantidadPendienteLiquidar: number;
    precio: number;
    precioUnitario: number;
    monedaCotizacion: string;
    fechaPrecio: string;
    parking: any | null; // Utiliza un tipo más específico si es posible
}

const TransactionCards = memo(
    ({ data, index, selectAsset }: { data: IPosition; index: number, selectAsset: (data: IPosition) => void }) => {
        const { currency } = useContext(AppContext)
        const styles = useStyleSheet(themedStyles);
        const amount = data.cantidadPendienteLiquidar - data.cantidadLiquidada
        const total = amount * data.precioUnitario

        return (
            <TouchableOpacity onPress={() => selectAsset(data)}>
                <AnimatedAppearance type={Animation_Types_Enum.SlideInLeft} index={index}>
                    <LayoutCustom
                        justify="space-between"
                        style={styles.item}
                        horizontal
                        pv={theme.paddings.xSmall}
                        itemsCenter
                        ph={theme.paddings.xSmall}
                    >
                        <LayoutCustom style={themedStyles.avatarContainer}>
                            <Avatar source={{ uri: "https://us.123rf.com/450wm/ahasoft2000/ahasoft20001712/ahasoft2000171204678/92468343-icono-de-moneda-de-plata-d%C3%B3lar-americano-el-estilo-de-trama-es-un-s%C3%ADmbolo-de-moneda-plana-gris.jpg" }} size="tiny" />
                        </LayoutCustom>
                        <LayoutCustom style={themedStyles.smallerContainer}>
                            <Text style={themedStyles.currencyText}>{data.simboloLocal}</Text>
                        </LayoutCustom>
                        <LayoutCustom style={themedStyles.smallerContainer}>
                            <Text style={themedStyles.normalTextSize}>{currencyFormat(data.precioUnitario, currency)}</Text>
                        </LayoutCustom>
                        <LayoutCustom pr={theme.paddings.small} style={themedStyles.biggerContainer}>
                            <Text numberOfLines={1} style={themedStyles.normalTextSize}>{currencyFormat(total, currency)}</Text>
                            <Text style={themedStyles.normalTextSize}>{amount}</Text>
                        </LayoutCustom>
                    </LayoutCustom>
                </AnimatedAppearance>
            </TouchableOpacity>
        );
    }
);
export default TransactionCards;

const themedStyles = StyleService.create({
    item: {
        // flex: 1,
        backgroundColor: "background-basic-color-3",
        marginBottom: theme.margins.small,
        gap: 6,
        shadowColor: "background-basic-color-5",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
        borderTopWidth: 1,
        borderColor: theme.colors.skyBlue,
        borderBottomWidth: 1
    },
    avatarContainer: {
        width: '15%'
    },
    smallerContainer: {
        width: '25%'
    },
    biggerContainer: {
        width: '30%',
        alignItems: "flex-end"
    },
    currencyText: {
        fontSize: 12,
        color: 'white'
    },
    normalTextSize: {
        fontSize: 10,
        color: 'white'
    }
});
