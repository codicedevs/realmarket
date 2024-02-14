import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
// ----------------------------- Hooks ---------------------------------------

// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, Text } from "components";

// ----------------------------- Types ---------------------------------------
import { ImageBackground } from "react-native";
import theme from "theme";

interface IBalanceCardProps {
    balance: number;
    grow: number;
}

const BalanceCard = React.memo(({ balance, grow }: IBalanceCardProps) => {
    const styles = useStyleSheet(themedStyles);

    return (
        <LayoutCustom alignSelfCenter style={styles.container}>
            {/* @ts-ignore */}
            <ImageBackground style={styles.imageCard} source={require("../../../assets/images/icons/illustration.png")}>
                <LayoutCustom style={styles.infoContainer}>
                    <LayoutCustom alignSelfCenter >
                        <Text fontSize={17} status="basic">Saldo</Text>
                    </LayoutCustom>
                    <LayoutCustom mt={theme.margins.small} mb={theme.margins.medium} alignSelfCenter>
                        <Text style={styles.moneyText} fontSize={22} status="basic" category="t2">
                            $1.345.000,00
                        </Text>
                        {/* <LayoutCustom style={styles.grow}>
          <Text category="c1" status={grow >= 0 ? "success-dark" : "danger"}>
          {grow >= 0 ? "+ " : "-"}
          {grow.toFixed(1)} %
          </Text>
        </LayoutCustom> */}
                    </LayoutCustom>
                </LayoutCustom>
            </ImageBackground>
        </LayoutCustom>
    );
});

export default BalanceCard;

const themedStyles = StyleService.create({
    container: {
        borderRadius: 20,
        backgroundColor: "background-basic-color-3",
        marginHorizontal: 16,
        overflow: "hidden",
        height: '55%',
        width: '85%',
    },
    infoContainer: {
        padding: theme.paddings.medium
    },
    imageCard: {
        height: "100%",
        backgroundColor: "#701BC4"
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
