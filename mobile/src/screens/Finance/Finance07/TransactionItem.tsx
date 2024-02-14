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
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
// ----------------------------- Components && Elements -----------------------

import { LayoutCustom, Text } from "components";
import dayjs from "dayjs";

interface ITransactionItemProps {
  image?: ImageSourcePropType | undefined;
  title: string;
  created_at: Date;
  amount: string;
  receivedBy?: string;
  total?: string
}

const TransactionItem: React.FC<{ data: ITransactionItemProps }> = ({
  data,
}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  return (
    <LayoutCustom style={styles.container} horizontal>
      <LayoutCustom horizontal gap={12} itemsCenter>
        <LayoutCustom style={styles.image}>
          <Text fontSize={10} category="subhead">
            {dayjs(data.created_at).format("MM/DD/YY")}
          </Text>
        </LayoutCustom>
        <LayoutCustom gap={1}>
          <Text>{data.title}</Text>
          {
            data.receivedBy ?
              <Text category="subhead" status="placeholder">
                {data.receivedBy}
              </Text>
              :
              null
          }
          <Text status="placeholder">{data.total}</Text>
        </LayoutCustom>
      </LayoutCustom>
      <Text category='body' status={data.amount[0] !== "-" ? "success-dark" : "danger"}>
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
    borderRadius: 20,
  },
});
