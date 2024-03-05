import React from "react";
import { Dimensions, ImageBackground } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet } from "@ui-kitten/components";
// ----------------------------- Components && Elements -----------------------
import theme from "../../utils/theme";
import LayoutCustom from "../LayoutCustom";
import Text from "../Text";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface IBalanceCardProps {
    balance: number;
    grow: number;
}

const BalanceCard = React.memo(({ balance, grow }: IBalanceCardProps) => {
    const styles = useStyleSheet(themedStyles);

    return (
        <LayoutCustom alignSelfCenter style={styles.container}>
            <ImageBackground style={styles.imageCard} source={require("../../assets/background/illustration.png")}>
                <LayoutCustom style={styles.infoContainer}>
                    <LayoutCustom alignSelfCenter >
                        <Text fontSize={17}>Saldo</Text>
                    </LayoutCustom>
                    <LayoutCustom mt={theme.margins.small} mb={theme.margins.medium} alignSelfCenter>
                        <Text style={styles.moneyText} fontSize={22} category="t2">
                            $1.345.000,00
                        </Text>
                    </LayoutCustom>
                </LayoutCustom>
            </ImageBackground>
        </LayoutCustom>
    );
});

export default BalanceCard;

const themedStyles = StyleService.create({
    container: {
        borderRadius: theme.borderRadius.medium,
        backgroundColor: "background-basic-color-3",
        marginHorizontal: theme.margins.small,
        overflow: "hidden",
        height: windowHeight * 0.15,
        width: windowWidth * 0.9,
    },
    infoContainer: {
        padding: theme.paddings.medium
    },
    imageCard: {
        height: "100%",
        backgroundColor: theme.colors.violet
    },
    grow: {
        borderRadius: 99,
        alignSelf: "flex-end",
        marginBottom: 4,
        backgroundColor: "background-basic-color-1",
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    moneyText: {
        color: '#009F9F'
    }
});
