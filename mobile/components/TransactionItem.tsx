import React from "react";
import { Text } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Assets ---------------------------------------
// ----------------------------- Components && Elements -----------------------

import { currencyFormat } from "../utils/number";
import theme from "../utils/theme";
import LayoutCustom from "./LayoutCustom";


export interface ITransactionItemProps {
  description: string;
  date: Date;
  amount: number;
  balance?: number
}

const TransactionItem: React.FC<{ data: ITransactionItemProps, selectTransaction: (data: ITransactionItemProps) => void, currency: string }> = ({
  data, selectTransaction, currency
}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();

  return (
    <LayoutCustom onPress={() => selectTransaction(data)} style={styles.container} horizontal>
      <LayoutCustom horizontal gap={12} itemsCenter>
        <LayoutCustom gap={1}>
          <LayoutCustom horizontal>
            <Text style={themedStyles.darkerText}>{data.description.slice(0, 20)}</Text>
            {/* {
            data.receivedBy ?
            <Text style={themedStyles.darkerText}>
                {data.receivedBy}
              </Text>
              :
              null
            } */}
          </LayoutCustom>
          <Text style={{ fontSize: 10, color: 'white' }}>
            {data.date.toString()}
          </Text>
          <Text style={{ color: 'white' }}>{currencyFormat(data.balance, currency)}</Text>
        </LayoutCustom>
      </LayoutCustom>
      <Text style={{ color: String(data.amount)[0] !== "-" ? "green" : "red" }}>
        {currencyFormat(data.amount, currency)}
      </Text>
    </LayoutCustom>
  );
};

export default TransactionItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.margins.medium
  },
  content: {},
  image: {
    width: 62,
    height: 62,
    borderColor: "background-basic-color-4",
    backgroundColor: "#252362",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius.medium,
  },
  darkerText: {
    color: "gray"
  }
});
