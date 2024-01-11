import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Modal,
  CalendarRange,
} from "@ui-kitten/components";
// ----------------------------- Types ---------------------------------------
import EvaIcons from "types/eva-icon-enum";
// ----------------------------- Components && Elements -----------------------
import { AppIcon, LayoutCustom, Text } from "components";
import SpendingItem, { ISpendingItemProps } from "./SpendingItem";
import _ from "lodash";
import dayjs from "dayjs";
import ModalSelectDate from "./ModalSelectDate";

const SpendingGoal = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const totalSpent = _.sumBy(Spend_sample, (i) => i.spent);
  const [range, setRange] = React.useState<CalendarRange<Date>>({});
  const [visible, setVisible] = React.useState(false);

  const _show = () => {
    setVisible(!visible);
  };
  return (
    <LayoutCustom style={styles.container}>
      <LayoutCustom>
        <LayoutCustom horizontal justify="space-between" itemsCenter>
          <Text>Spend</Text>
          <LayoutCustom horizontal itemsCenter gap={4} onPress={_show}>
            <AppIcon
              name={EvaIcons.CalendarOutline}
              fill={theme["text-grey-color"]}
            />
            <Text category="c1" status="grey">
              Select Range
            </Text>
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom horizontal mt={4}>
          <Text category="subhead" status="grey">
            From: {dayjs(range.startDate).format("MMM DD YYYY")}
            {" - "}
          </Text>
          <Text category="subhead" status="grey">
            {dayjs(range.endDate).format("MMM DD YYYY")}
          </Text>
        </LayoutCustom>
      </LayoutCustom>
      <LayoutCustom gap={12} style={styles.total} itemsCenter>
        <Text category="t1" status="white">
          {totalSpent.toLocaleString("us-UK", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </Text>
        <Text category="subhead" status="white" opacity={0.7}>
          total spent this month
        </Text>
      </LayoutCustom>
      <LayoutCustom horizontal justify="space-between" itemsCenter>
        <Text>Active Goals</Text>
        <LayoutCustom horizontal itemsCenter gap={4}>
          <AppIcon
            name={EvaIcons.PlusSquareOutline}
            fill={theme["color-success-700"]}
          />
          <Text category="c1" status="success-dark">
            Add Budget
          </Text>
        </LayoutCustom>
      </LayoutCustom>
      <LayoutCustom gap={16}>
        {Spend_sample.map((spent, index) => {
          return <SpendingItem item={spent} key={index} />;
        })}
      </LayoutCustom>
      <Modal
        visible={visible}
        onBackdropPress={_show}
        backdropStyle={styles.backdropStyle}
      >
        <ModalSelectDate range={range} setRange={setRange} close={_show} />
      </Modal>
    </LayoutCustom>
  );
});

export default SpendingGoal;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    gap: 24,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  total: {
    padding: 16,
    backgroundColor: "color-success-700",
    marginHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 4,
  },
  backdropStyle: {
    backgroundColor:"color-basic-800",
    opacity: 0.8,
  },
});

const Spend_sample: ISpendingItemProps[] = [
  { name: "🏪 Restaurent", target: 100, spent: 24 },
  { name: "🛍️ Shopping", target: 1000, spent: 564 },
  { name: "💈 Barber", target: 24, spent: 12 },
  { name: "✈️ Travel", target: 1200, spent: 344 },
  { name: "🏪 Restaurent", target: 100, spent: 24 },
];
