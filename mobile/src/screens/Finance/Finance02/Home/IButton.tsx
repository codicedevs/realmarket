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
import theme from "theme";

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
    <LayoutCustom itemsCenter onPress={onPress} style={styles.button}>
      <LayoutCustom style={styles.layoutIcon} >
        <Icon pack="assets" name={icon} />
      </LayoutCustom>
      <Text fontSize={12} center numberOfLines={2} >
        {title}
      </Text>
    </LayoutCustom>
  );
});

export default IButton;

const themedStyles = StyleService.create({
  button: {
    width: '30%',
    height:'100%',
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 15,
    paddingTop: theme.paddings.small,
    paddingBottom: theme.paddings.small
  },
  layoutIcon: {
    width: theme.image.medium,
    height: theme.image.small,
    alignItems: "center",
    justifyContent: "center",
  },
});
