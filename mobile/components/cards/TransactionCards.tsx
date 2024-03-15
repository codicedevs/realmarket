import React, { memo } from "react";
// ----------------------------- UI kitten -----------------------------------
import {
    Avatar,
    StyleService,
    useStyleSheet
} from "@ui-kitten/components";
// ----------------------------- Lodash -----------------------------------
import { Text } from "react-native";
import theme from "../../utils/theme";
import AnimatedAppearance, { Animation_Types_Enum } from "../AnimatedAppearance";
import LayoutCustom from "../LayoutCustom";

export interface ICoinProps {
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    circulating_supply: number;
    current_price: number;
    fully_diluted_valuation: number | null;
    high_24h: number;
    id: string;
    image: string;
    last_updated: string;
    low_24h: number;
    market_cap: number;
    max_supply: number | null;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number | null;
    name: string;
    price_change_24h: number;
    price_change_percentage_24h: number;
    roi: {
        currency: string;
        percentage: number;
        times: number;
    } | null;
    symbol: string;
    total_supply: number;
    total_volume: number;
    sparkline_in_7d: { price: Array<number> };
}

const TransactionCards = memo(
    ({ data, index }: { data: ICoinProps; index: number }) => {
        const styles = useStyleSheet(themedStyles);
        return (
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
                        <Avatar source={{ uri: data.image }} size="tiny" />
                    </LayoutCustom>
                    <LayoutCustom style={themedStyles.smallerContainer}>
                        <Text style={themedStyles.currencyText}>AR$</Text>
                    </LayoutCustom>
                    <LayoutCustom style={themedStyles.smallerContainer}>
                        <Text style={themedStyles.normalTextSize}>$98930.81</Text>
                    </LayoutCustom>
                    <LayoutCustom pr={theme.paddings.small} style={themedStyles.biggerContainer}>
                        <Text numberOfLines={1} style={themedStyles.normalTextSize}>$10.450.000</Text>
                        <Text style={themedStyles.normalTextSize}>323</Text>
                    </LayoutCustom>
                </LayoutCustom>
            </AnimatedAppearance>
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
        width: '20%'
    },
    smallerContainer: {
        width: '25%'
    },
    biggerContainer: {
        width: '25%',
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
