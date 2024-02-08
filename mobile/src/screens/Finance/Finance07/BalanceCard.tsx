import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout, useToggle } from "hooks";

// ----------------------------- Components && Elements -----------------------
import { AppIcon, LayoutCustom, Text } from "components";
import convertPrice from "utils/convertPrice";

// ----------------------------- Types ---------------------------------------
import EvaIcons from "types/eva-icon-enum";
import { Images } from "assets/images";
import { Image, ImageBackground } from "react-native";
import theme from "theme";

interface IBalanceCardProps {
    balance: number;
    grow: number;
}

const BalanceCard = React.memo(({ balance, grow }: IBalanceCardProps) => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    return (
        <LayoutCustom alignSelfCenter style={styles.container}>
            {/* @ts-ignore */}
            <ImageBackground style={styles.imageCard} source={require("../../../assets/images/icons/illustration.png")}>
                <LayoutCustom style={styles.infoContainer}>
                    <LayoutCustom mt={10} alignSelfCenter >
                        <Text fontSize={17} status="basic">Saldo</Text>
                    </LayoutCustom>
                    <LayoutCustom mt={16} alignSelfCenter>
                        <Text fontSize={22} status="basic" category="t2">
                            $1.345.678,00
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
        borderRadius: 16,
        backgroundColor: "background-basic-color-3",
        marginHorizontal: 16,
        overflow: "hidden",
        height: '45%',
        width: '90%',
    },
    infoContainer: {
        padding: theme.paddings.medium
    },
    imageCard: {
        height: "100%"
    },
    grow: {
        borderRadius: 99,
        alignSelf: "flex-end",
        marginBottom: 4,
        backgroundColor: "background-basic-color-1",
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
});
