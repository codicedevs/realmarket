import React from "react";
import { ImageSourcePropType } from "react-native";
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

import dayjs from "dayjs";
import theme from "../utils/theme";
import LayoutCustom from "./LayoutCustom";
import Text from "./Text";

interface ITransactionItemProps {
  image?: ImageSourcePropType | undefined;
  title: string;
  created_at: Date;
  amount: string;
  receivedBy?: string;
  total?: string
}

const TransactionItem: React.FC<{ data: ITransactionItemProps,selectTransaction: (data: ITransactionItemProps) => void }> = ({
  data,selectTransaction
}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();

  return (
    <LayoutCustom onPress={() => selectTransaction(data)} style={styles.container} horizontal>
      <LayoutCustom horizontal gap={12} itemsCenter>
        <LayoutCustom  gap={1}>
          <LayoutCustom horizontal>
          <Text style={themedStyles.darkerText}>{data.title}</Text>
          {
            data.receivedBy ?
            <Text style={themedStyles.darkerText}>
                {data.receivedBy}
              </Text>
              :
              null
            }
            </LayoutCustom>
            <Text style={{fontSize:10}}>
            {dayjs(data.created_at).format("MM/DD/YY")}
          </Text>
          <Text>{data.total}</Text>
        </LayoutCustom>
      </LayoutCustom>
      <Text style={{color:data.amount[0] !== "-" ? "green" : "red" }}>
        {data.amount}
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
