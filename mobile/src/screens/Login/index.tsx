import React from "react";
import { Dimensions, Image, ImageBackground, TextInput } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  // Input,
  StyleService,
  useStyleSheet
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
// ----------------------------- Components && Elements -----------------------

import {
  Container, LayoutCustom, Text
} from "components";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "theme";
import { FinanceStackParamList } from "types/navigation-types";
// import IButton from "./IButton";
// import TimeCard from "./TimeCard";
// import CurrencyToggle from "../../../../components/Switch";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  return (
    <Container style={styles.container}>
      <ImageBackground style={{ height: '100%' }} source={require("../../assets/images/Login/fondoLogin.png")}>
        <LayoutCustom ph={theme.paddings.large} pv={theme.paddings.xlarge}>
          <LayoutCustom itemsCenter>
            <Image style={themedStyles.img} source={require("../../assets/images/Login/rm-logo.png")} />
            <LayoutCustom itemsCenter mt={theme.margins.large}>
              <Text category="header" fontSize={33}>Bienvenido!</Text>
              <Text category="subhead" style={{ textAlign: 'center', lineHeight: 25 }} fontSize={18} numberOfLines={2}>Ingrese su nombre de usuario y contraseña</Text>
            </LayoutCustom>
          </LayoutCustom>
          <LayoutCustom pv={theme.paddings.large} justify="space-around" style={{ height: '45%' }}>
            <TextInput placeholder="Nombre de usuario" placeholderTextColor={"#ffffff"} style={{ borderBottomWidth: 1, height: 50, borderColor: '#ffffff', color: '#ffffff', fontSize: 20, paddingBottom: 15 }} />
            <TextInput placeholder="Contraseña" placeholderTextColor={"#ffffff"} style={{ borderBottomWidth: 1, height: 50, borderColor: '#ffffff', color: '#ffffff', fontSize: 20, paddingBottom: 15 }} />
          </LayoutCustom>
          <LayoutCustom mt={theme.margins.xSmall}>
            <TouchableOpacity style={{ backgroundColor: "#0E0D31", alignItems: "center", padding: theme.paddings.small, borderRadius: 21, width: '70%', alignSelf: "center" }} onPress={() => navigate('Finance02')}>
              <Text category="t2" fontSize={24}>LOGIN</Text>
            </TouchableOpacity>
            <LayoutCustom mt={theme.margins.small} style={{ alignItems: "center" }}>
              <Text style={{ color: "#0E0D31" }}>Olvido su contraseña?</Text>
              <Text style={{ color: "#0E0D31" }}>O crear nueva cuenta?</Text>
            </LayoutCustom>
          </LayoutCustom>
        </LayoutCustom>
      </ImageBackground>
    </Container>
  );
});

export default LoginScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    // paddingHorizontal: theme.paddings.medium
  },
  img: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.13
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
  },
  moneyText: {
    color: theme.colors.skyBlue
  },
  buttonContainer: {
    width: '50%',
    padding: theme.paddings.medium
  },
  carouselStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.margins.small,
  }
});