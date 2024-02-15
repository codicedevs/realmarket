import React, { memo } from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  Avatar,
  StyleService,
  useStyleSheet
} from "@ui-kitten/components";
// ----------------------------- Hooks -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Lodash -----------------------------------
import _ from "lodash";
// ----------------------------- Components -----------------------------------
import { LayoutCustom, Text } from "components";
// ----------------------------- LinearGradient -----------------------------------
// ----------------------------- Victory Chart -----------------------------------
// ----------------------------- Util -----------------------------------
// ----------------------------- @Types -----------------------------------
import AnimatedAppearance, {
  Animation_Types_Enum,
} from "components/AnimatedAppearance";
// ----------------------------- Reduxs -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
import theme from "theme";
import { CurrencyTypeEnum } from "types/element-types";
import { RootStackParamList } from "types/navigation-types";

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

const ActionCard = memo(
  ({ data, index }: { data: ICoinProps; index: number }) => {
    const { width } = useLayout();
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
    const styles = useStyleSheet(themedStyles);

    const prices = _.map(
      data.sparkline_in_7d.price.slice(-30),
      (index, item) => {
        return { y: item, x: index };
      }
    );

    const status_price =
      data.market_cap_change_percentage_24h >= 0 ? true : false;
    const max_width = 100 * (width / 375);
    const currency = {
      title: "US Dollar",
      symbol: "$",
      value: CurrencyTypeEnum.USD,
    };
    return (
      <AnimatedAppearance type={Animation_Types_Enum.SlideInLeft} index={index}>
        <LayoutCustom
          justify="space-between"
          style={styles.item}
          horizontal
          pv={theme.paddings.xSmall}
          itemsCenter
          ph={theme.paddings.xSmall}
        // onPress={goBack}
        >
          {/* <LayoutCustom
            style={[
              styles.divider,
              {
                backgroundColor: status_price
                  ? theme["color-success-default"]
                  : theme["color-danger-default"],
              },
            ]}
          /> */}
          <LayoutCustom style={{ width: '20%' }}>
            <Avatar source={{ uri: data.image }} size="tiny" />
          </LayoutCustom>
          <LayoutCustom style={{ width: '25%' }}>
            <Text fontSize={12}>AR$</Text>
          </LayoutCustom>
          <LayoutCustom style={{ width: '25%' }}>
            <Text fontSize={10}>$98930.81</Text>
          </LayoutCustom>
          <LayoutCustom pr={theme.paddings.small} style={{ width: '25%', alignItems: "flex-end" }}>
            <Text numberOfLines={1} fontSize={10}>$10.450.000</Text>
            <Text category="subhead" fontSize={10}>323</Text>
          </LayoutCustom>
        </LayoutCustom>
      </AnimatedAppearance>
    );
  }
);

export default ActionCard;

const themedStyles = StyleService.create({
  item: {
    flex: 1,
    backgroundColor: "background-basic-color-3",
    marginBottom: 12,
    gap: 6,
    // marginHorizontal: theme.margins.small,
    // shadow
    shadowColor: "background-basic-color-5",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderTopWidth: 1,
    borderColor: '#009F9F',
    borderBottomWidth: 1
  }
});
