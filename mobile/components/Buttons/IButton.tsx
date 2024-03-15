import React from "react";
import { Image, Text } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Assets ---------------------------------------
import theme from "../../utils/theme";
import LayoutCustom from "../LayoutCustom";
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
        <Image style={{ width: 36, height: 36 }} source={name} />
        {/* </LayoutCustom> */}
      </LayoutCustom>
      <Text style={themedStyles.buttonText} numberOfLines={2} >
        {title}
      </Text>
    </LayoutCustom>
  );
});

export default IButton;

const themedStyles = StyleService.create({
  button: {
    width: '100%',
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
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  }

});
