import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
  RangeCalendar,
  CalendarRange,
} from "@ui-kitten/components";
// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, NavigationAction, Text } from "components";
import EvaIcons from "types/eva-icon-enum";
import { globalStyle } from "styles/globalStyle";

interface IModalSelectDateProps {
  range: CalendarRange<Date>;
  close(): void;
  setRange: React.Dispatch<React.SetStateAction<CalendarRange<Date>>>;
}

const ModalSelectDate = React.memo(
  ({ range, close, setRange }: IModalSelectDateProps) => {
    const styles = useStyleSheet(themedStyles);
    const [date, setDate] = React.useState<CalendarRange<Date>>(range);
    const _onConfirm = () => {
      setRange(date);
      close();
    };
    return (
      <LayoutCustom level="1" style={styles.contentModal}>
        <TopNavigation
          alignment="center"
          title={"Select Date"}
          accessoryLeft={() => (
            <NavigationAction
              marginLeft={8}
              icon={EvaIcons.CloseOutline}
              onPress={close}
            />
          )}
        />
        <RangeCalendar
          boundingMonth
          range={date}
          onSelect={(nextRange) => setDate(nextRange)}
        />
        <LayoutCustom horizontal gap={24} margin={24}>
          <Button
            children="Cancel"
            status="danger"
            appearance="outline"
            style={styles.buttonConfirm}
            onPress={close}
          />
          <Button
            children="Confirm"
            style={styles.buttonConfirm}
            onPress={_onConfirm}
          />
        </LayoutCustom>
      </LayoutCustom>
    );
  }
);

export default ModalSelectDate;

const themedStyles = StyleService.create({
  contentModal: {
    ...globalStyle.shadow,
    borderRadius: 16,
    overflow: "hidden",
    paddingTop: 8,
  },
  buttonConfirm: {
    flex: 1,
  },
});
