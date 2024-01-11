import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  ProgressBar,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
// ----------------------------- Components && Elements -----------------------
import { AppIcon, LayoutCustom, Text } from "components";
import { globalStyle } from "styles/globalStyle";
import EvaIcons from "types/eva-icon-enum";

export interface ISpendingItemProps {
  name: string;
  target: number;
  spent: number;
}

const SpendingItem = React.memo(({ item }: { item: ISpendingItemProps }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  const convertPrice = (num: number) => {
    return num.toLocaleString("us-UK", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
  };

  return (
    <LayoutCustom style={styles.container} level="1" horizontal>
      <LayoutCustom style={styles.content}>
        <LayoutCustom horizontal itemsCenter justify="space-between">
          <Text category="t5">{item.name}</Text>
          <Text status="grey">{convertPrice(item.target)}</Text>
        </LayoutCustom>
        <ProgressBar
          progress={item.spent / item.target}
          style={styles.progress}
          status='success'
        />
        <LayoutCustom horizontal itemsCenter justify="space-between">
          <Text status="grey" category="subhead">
            {convertPrice(item.spent)} spent
          </Text>
          <Text status="success-dark" category="subhead">
            {convertPrice(item.target - item.spent)} left
          </Text>
        </LayoutCustom>
      </LayoutCustom>
      <AppIcon name={EvaIcons.ChevronRight} size={32} />
    </LayoutCustom>
  );
});

export default SpendingItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    ...globalStyle.shadow,
    padding: 16,
    paddingRight: 0,
    borderRadius: 16,
    gap: 8,
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 16,
  },
  progress: {
    height: 10,
    borderRadius: 99,
  },
});
