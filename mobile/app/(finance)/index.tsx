import React, { useState } from "react"
import { Dimensions, Text, View } from "react-native"
import Container from "../../components/Container"
import RoundedButton from "../../components/Buttons/RoundedButton"
import { StyleService, TopNavigation } from "@ui-kitten/components"
import theme from "../../utils/theme"
import LayoutCustom from "../../components/LayoutCustom"
import CurrencyToggle from "../../components/CurrencyToggle"
import { sample_coin } from "../../assets/sampleData"
import TransactionCards from "../../components/cards/TransactionCards"
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Finance = () => {
    const [currency, setCurrency] = useState('ARS')
    return (
        <Container style={themedStyles.container}>
            <TopNavigation
                alignment="center"
                title="Posiciones"
                style={themedStyles.topNavigation}
                accessoryLeft={() => (
                    <RoundedButton icon="arrow-back-outline" />
                )}
                accessoryRight={() => <RoundedButton icon="person-outline" />}
            />
            <LayoutCustom>
                <LayoutCustom mt={theme.margins.large} mb={theme.margins.medium} alignSelfCenter>
                    <CurrencyToggle changeCurrency={setCurrency} />
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
                <LayoutCustom 
                ph={theme.paddings.medium}
                >
                    {sample_coin.map((coin, index) => {
                        return <TransactionCards data={coin} index={index} key={index} />;
                    })}
                </LayoutCustom>
            </LayoutCustom>
        </Container>
    )
}

export default Finance

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor:theme.colors.background
    },
    topNavigation: {
        paddingHorizontal: theme.paddings.medium,
        backgroundColor:theme.colors.background
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
        color:"white"
    }
});
