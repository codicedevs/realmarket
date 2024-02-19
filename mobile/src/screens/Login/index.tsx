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
      <ImageBackground style={themedStyles.background} source={require("../../assets/images/Login/fondoLogin.png")}>
        <LayoutCustom ph={theme.paddings.large} pv={theme.paddings.xlarge}>
          <LayoutCustom itemsCenter>
            <Image style={themedStyles.img} source={require("../../assets/images/Login/rm-logo.png")} />
            <LayoutCustom itemsCenter mt={theme.margins.large}>
              <Text category="header" fontSize={33}>Bienvenido!</Text>
              <Text category="subhead" style={themedStyles.subTitle} fontSize={18} numberOfLines={2}>Ingrese su nombre de usuario y contraseña</Text>
            </LayoutCustom>
          </LayoutCustom>
          <LayoutCustom pv={theme.paddings.large} justify="space-around" style={themedStyles.inputContainer}>
            <TextInput placeholder="Nombre de usuario" placeholderTextColor={"#ffffff"} style={themedStyles.input} />
            <TextInput placeholder="Contraseña" placeholderTextColor={"#ffffff"} style={themedStyles.input} />
          </LayoutCustom>
          <LayoutCustom mt={theme.margins.xSmall}>
            <TouchableOpacity style={themedStyles.buttonContainer} onPress={() => navigate('Finance02')}>
              <Text category="t2" fontSize={24}>LOGIN</Text>
            </TouchableOpacity>
            <LayoutCustom mt={theme.margins.small} style={{ alignItems: "center" }}>
              <Text style={themedStyles.forgottenPasswordText}>Olvido su contraseña?</Text>
              <Text style={themedStyles.forgottenPasswordText}>O crear nueva cuenta?</Text>
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
  background: {
    height: '100%',
  },
  subTitle: {
    textAlign: 'center',
    lineHeight: 25
  },
  inputContainer: {
    height: '45%'
  },
  input: {
    borderBottomWidth: 1,
    height: 50,
    borderColor: '#ffffff',
    color: '#ffffff',
    fontSize: 20,
    paddingBottom: 15,
    fontWeight: "bold"
  },
  buttonContainer: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    padding: theme.paddings.small,
    borderRadius: 21,
    width: '70%',
    alignSelf: "center"
  },
  forgottenPasswordText: {
    color: theme.colors.forgoten_password_Text
  }
});