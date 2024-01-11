import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { AppIcon, LayoutCustom, Text } from "components";
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
import convertPrice from "utils/convertPrice";
import EvaIcons from "types/eva-icon-enum";

interface TransactionHistoryProps {
  title: string;
  balance: number;
  describe: string;
  creatAt: Date;
}

const TransactionHistory: React.FC<{
  transaction: TransactionHistoryProps;
}> = ({ transaction }) => {
  const theme = useTheme();
  const { title, balance, describe, creatAt } = transaction;
  const styles = useStyleSheet(themedStyles);
  return (
    <LayoutCustom style={styles.container} horizontal gap={16}>
      <AppIcon
        name={
          balance < 0
            ? EvaIcons.DiagonalArrowLeftDown
            : EvaIcons.DiagonalArrowLeftUp
        }
        size={24}
        buttonStyle={[
          styles.icon,
          balance < 0 && { borderColor: theme["text-danger-color"] },
        ]}
        fill={
          balance < 0 ? theme["text-danger-color"] : theme["color-success-700"]
        }
      />
      <LayoutCustom style={{ flex: 1 }}>
        <LayoutCustom horizontal itemsCenter justify="space-between" gap={4}>
          <Text category="body">{title}</Text>
          <Text
            category="subhead"
            status={balance < 0 ? "danger" : "success-dark"}
          >
            {convertPrice(balance)}
          </Text>
        </LayoutCustom>
        <Text category="subhead" status="grey">
          {describe}
        </Text>
      </LayoutCustom>
    </LayoutCustom>
  );
};

export default TransactionHistory;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 12,
  },
  icon: {
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "color-success-700",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
