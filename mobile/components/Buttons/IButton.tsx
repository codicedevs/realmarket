import React from "react";
import { View, Image, StyleSheet } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Assets ---------------------------------------
import LayoutCustom from "../LayoutCustom";
import Text from "../Text";
import theme from "../../utils/theme";
// ----------------------------- Components && Elements -----------------------

interface IButtonProps {
  name: string;
  icon: string;
  title: string;
  onPress?(): void;
}

const IButton = React.memo(({ name, icon, title, onPress }: IButtonProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();

  return (
    <LayoutCustom itemsCenter onPress={onPress} style={styles.button}>
      <LayoutCustom style={styles.layoutIcon} >
        {/* <Icon pack="assets" name={icon} /> */}
        {/* <LayoutCustom padding={5} style={{backgroundColor:'red'}}> */}
        {/* Generar nuevo tamanio para las imagenes en theme */}
          <Image style={{ width: 36, height: 36 }} source={name} />
        {/* </LayoutCustom> */}
      </LayoutCustom>
      <Text style={{color: 'white'}} fontSize={12} center numberOfLines={2} >
        {title}
      </Text>
    </LayoutCustom>
  );
});

export default IButton;

const themedStyles = StyleService.create({
  button: {
    width:'100%',
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 20,
    paddingTop: theme.paddings.small,
    paddingBottom: theme.paddings.small
  },
  layoutIcon: {
    width: theme.image.medium,
    height: theme.image.small,
    alignItems: "center",
    justifyContent: "center",
    margin: theme.margins.small,

  },
});
