import React from "react";
import { Image } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  CircularProgressBar,
} from "@ui-kitten/components";

// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";

// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";

// ----------------------------- Components && Elements -----------------------
import { AppIcon, LayoutCustom, Text } from "components";

// ----------------------------- Utils ---------------------------------------
import convertPrice from "utils/convertPrice";

// ----------------------------- Styles ---------------------------------------
import { globalStyle } from "styles/globalStyle";

// ----------------------------- Types ---------------------------------------
import EvaIcons from "types/eva-icon-enum";
import { ISavingGoalItemProps } from "./SavingGoalPinItem";
import dayLeftUtil from "utils/dayLeftUtil";

const SavingGoalItem = React.memo(
  ({ item }: { item: ISavingGoalItemProps }) => {
    const { name, target, create_at, targe_date, amount } = item;
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { height, width, top, bottom } = useLayout();

    const per = (amount / target) * 100;

    const targetLeft = target - amount;

    return (
      <LayoutCustom style={styles.container} level="1">
        <LayoutCustom horizontal justify="space-between" itemsCenter>
          <Text category="t5" maxWidth={148 * (width / 375)} numberOfLines={1}>
            {name}
          </Text>
          <LayoutCustom horizontal gap={4} itemsCenter mt={4}>
            <AppIcon
              name={EvaIcons.CalendarOutline}
              fill={theme["text-grey-color"]}
              size={16}
            />
            <Text status="grey" category='c1'>{dayLeftUtil(create_at, targe_date)} days left</Text>
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom horizontal mv={8} gap={24} justify="space-between">
          <LayoutCustom>
            <LayoutCustom>
              <Text category="header" status="success-dark">
                {per.toFixed(0)}%
              </Text>
              <Text category="subhead" status="success-dark">
                Complete
              </Text>
            </LayoutCustom>
            <LayoutCustom horizontal gap={12} itemsCenter mt={12} mb={4}>
              <LayoutCustom
                style={[
                  styles.dot,
                  { backgroundColor: theme["background-basic-color-4"] },
                ]}
              />
              <LayoutCustom gap={4} horizontal itemsCenter>
                <Text status="grey">{convertPrice(targetLeft)}</Text>
                <Text category="subhead" status="grey">
                  left
                </Text>
              </LayoutCustom>
            </LayoutCustom>
            <LayoutCustom horizontal gap={12} itemsCenter>
              <LayoutCustom
                style={[
                  styles.dot,
                  { backgroundColor: theme["color-success-700"] },
                ]}
              />
              <LayoutCustom gap={4} horizontal itemsCenter>
                <Text status="success-dark">{convertPrice(amount)}</Text>
                <Text category="subhead" status="success-dark">
                  saved
                </Text>
              </LayoutCustom>
            </LayoutCustom>
          </LayoutCustom>
          <CircularProgressBar
            progress={per / 100}
            size="giant"
            status="success"
            style={styles.circle}
            textStyle={styles.textStyle}
            renderIcon={<Image source={Images.finance.leaves} />}
          />
        </LayoutCustom>
      </LayoutCustom>
    );
  }
);

export default SavingGoalItem;

const themedStyles = StyleService.create({
  container: {
    ...globalStyle.shadow,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    flex: 1,
    marginHorizontal: 24,
    marginVertical: 12,
  },
  content: {},
  circle: {
    alignSelf: "flex-end",
  },
  textStyle: {
    color: "transparent",
  },
  iconCircle: {
    width: 40,
    height: 40,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 99,
  },
});
