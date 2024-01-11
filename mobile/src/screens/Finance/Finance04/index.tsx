import React from "react";
import { View, Image, StyleSheet } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  ViewPager,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import {
  AppIcon,
  Container,
  Content,
  LayoutCustom,
  TabBar,
  Text,
} from "components";
import EvaIcons from "types/eva-icon-enum";
import SpendingItem, { ISpendingItemProps } from "./SpendingItem";
import SpendingGoal from "./SpendingGoal";
import SavingGoal from "./SavingGoal";

const Finance04 = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  const [active, setActive] = React.useState(0);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[styles.topNavigation, { paddingTop: top + 16 }]}
        title={() => (
          <Text category="t5" status="white">
            My Goal
          </Text>
        )}
        accessoryLeft={() => (
          <LayoutCustom mr={12} onPress={goBack}>
            <AppIcon
              size={32}
              name={EvaIcons.Menu2}
              fill={theme["text-white-color"]}
            />
          </LayoutCustom>
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <TabBar
          onChangeTab={setActive}
          tabActive={active}
          tabs={["Saving Goal", "Spending Goal"]}
          style={styles.tabbar}
          tabStyle={styles.tabStyle}
          backgroundTabActive={theme["color-success-700"]}
        />
        <ViewPager
          swipeEnabled={false}
          style={styles.viewPager}
          selectedIndex={active}
          onSelect={setActive}
        >
          <SavingGoal />
          <SpendingGoal />
        </ViewPager>
      </Content>
    </Container>
  );
});

export default Finance04;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 80,
  },
  tabbar: {
    borderRadius: 99,
    marginHorizontal: 16,
  },
  tabStyle: {
    borderRadius: 99,
  },
  topNavigation: {
    backgroundColor: "color-success-700",
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  viewPager: {
    flex: 1,
  },
});
