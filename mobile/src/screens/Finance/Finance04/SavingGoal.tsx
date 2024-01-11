import React from "react";
import { View, Image, StyleSheet } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import { AppIcon, Content, LayoutCustom, Text } from "components";
import SavingGoalPinItem, { ISavingGoalItemProps } from "./SavingGoalPinItem";
import EvaIcons from "types/eva-icon-enum";
import SavingGoalItem from "./SavingGoalItem";

const SavingGoal = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  return (
    <LayoutCustom style={styles.container}>
      <Text category="t5" marginLeft={24} marginTop={24}>
        Pinned Goals
      </Text>
      <Content horizontal contentContainerStyle={styles.content}>
        {SAMPLE.map((item, index) => {
          return <SavingGoalPinItem item={item} key={index} />;
        })}
      </Content>
      <LayoutCustom mt={24}>
        <LayoutCustom horizontal itemsCenter justify="space-between" mh={24} mb={12}>
          <Text category="t5">Goals</Text>
          <LayoutCustom horizontal itemsCenter gap={4}>
            <AppIcon
              name={EvaIcons.PlusSquareOutline}
              fill={theme["color-success-700"]}
            />
            <Text category="c1" status="success-dark">
              {"Add Goal"}
            </Text>
          </LayoutCustom>
        </LayoutCustom>
        {SAMPLE_GOALS.map((item, index) => {
          return <SavingGoalItem item={item} key={index}/>;
        })}
      </LayoutCustom>
    </LayoutCustom>
  );
});

export default SavingGoal;

const themedStyles = StyleService.create({
  container: {},
  content: {
    gap: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
});

const SAMPLE: ISavingGoalItemProps[] = [
  {
    name: "✈️ Paris Trip",
    create_at: "2023-06-01",
    targe_date: "2023-07-01",
    target: 55100,
    amount: 42400,
  },
  {
    name: "🚘 New Car",
    create_at: "2023-06-01",
    targe_date: "2023-12-12",
    target: 25100,
    amount: 12400,
  },
  {
    name: "🎮 Gaming Gear",
    create_at: "2023-01-06",
    targe_date: "2023-12-12",
    target: 255000,
    amount: 50400,
  },
  {
    name: "📷 Camera Lens",
    create_at: "2023-01-06",
    targe_date: "2023-12-12",
    target: 125100,
    amount: 32400,
  },
  {
    name: "🏠 New House",
    create_at: "2023-01-06",
    targe_date: "2023-12-12",
    target: 525100,
    amount: 72400,
  },
];
const SAMPLE_GOALS: ISavingGoalItemProps[] = [
  {
    name: "📱 New Phone",
    create_at: "2023-06-01",
    targe_date: "2023-07-01",
    target: 55100,
    amount: 42400,
  },
  {
    name: "📷 New Camera",
    create_at: "2023-06-01",
    targe_date: "2023-12-12",
    target: 25100,
    amount: 12400,
  },
  {
    name: "🎮 New Gaming Gear",
    create_at: "2023-01-06",
    targe_date: "2023-12-12",
    target: 255000,
    amount: 50400,
  },
  {
    name: "📷 Camera Lens",
    create_at: "2023-01-06",
    targe_date: "2023-12-12",
    target: 125100,
    amount: 32400,
  },
  {
    name: "🏠 New House",
    create_at: "2023-01-06",
    targe_date: "2023-12-12",
    target: 525100,
    amount: 72400,
  },
];
