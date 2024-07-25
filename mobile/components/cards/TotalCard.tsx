import React, { memo } from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet
} from "@ui-kitten/components";
// ----------------------------- Lodash -----------------------------------
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { currencyFormat } from "../../utils/number";
import theme from "../../utils/theme";
import AnimatedAppearance, { Animation_Types_Enum } from "../AnimatedAppearance";
import LayoutCustom from "../LayoutCustom";
const windowHeight = Dimensions.get("window").height;


const TotalCard = memo(
  ({ data, index }: { data: any; index: number }) => {
    const styles = useStyleSheet(themedStyles);

    return (
      <TouchableOpacity >
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
            </LayoutCustom>
            <LayoutCustom style={themedStyles.smallerContainer}>
              <Text style={themedStyles.currencyText}>Total</Text>
            </LayoutCustom>
            <LayoutCustom pr={theme.paddings.small} style={themedStyles.biggerContainer}>
              <Text numberOfLines={1} style={themedStyles.normalTextSize}>{currencyFormat(data.total, 'ARS')}</Text>
            </LayoutCustom>
          </LayoutCustom>
        </AnimatedAppearance>
      </TouchableOpacity>
    );
  }
);
export default TotalCard;

const themedStyles = StyleService.create({
  item: {
    // flex: 1,
    backgroundColor: '#8CB9BD',
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
    borderBottomWidth: 1,
    opacity: 0.9,
    height: windowHeight * 0.05
  },
  avatarContainer: {
    width: '15%'
  },
  smallerContainer: {
    width: '25%'
  },
  biggerContainer: {
    width: '60%',
    alignItems: "flex-end",
  },
  currencyText: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Lato-Bold'
  },
  normalTextSize: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'Lato-Bold',
    marginRight: 10
  }
});
