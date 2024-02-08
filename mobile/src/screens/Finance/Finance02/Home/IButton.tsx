import React from "react";
import { View, Image, StyleSheet } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Icon,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import { Container, Content, LayoutCustom, Text } from "components";

interface IButtonProps {
  icon: string;
  title: string;
  onPress?(): void;
}

const IButton = React.memo(({ icon, title, onPress }: IButtonProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  return (
    <LayoutCustom itemsCenter onPress={onPress} style={styles.button} level="2">
      <LayoutCustom style={styles.layoutIcon} >
        <Icon pack="assets" name={icon} />
      </LayoutCustom>
      <Text center numberOfLines={2} opacity={0.6}>
        {title}
      </Text>
    </LayoutCustom>
  );
});

export default IButton;

const themedStyles = StyleService.create({
  button: {
    width: '35%',
    borderColor: "background-basic-color-3",
    borderRadius: 8,
    borderWidth: 1,
    padding: 5
  },
  layoutIcon: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
