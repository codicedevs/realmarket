import { StyleService } from "@ui-kitten/components";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity } from "react-native";
import Container from "../../components/Container";
import LayoutCustom from "../../components/LayoutCustom";
import theme from "../../utils/theme";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const Auth = () => {
  const background = require("../../assets/Login/fondoLogin.png")
  const logo = require("../../assets/Login/rm-logo.png")
  const [email, setEmail] = useState('')

  const handleEmail = (text: string) => {
    setEmail(text)
  }

  return (
    <Container style={themedStyles.container}>
      <ImageBackground style={themedStyles.background} source={background}>
        <LayoutCustom ph={theme.paddings.large} pv={theme.paddings.xlarge}>
          <LayoutCustom itemsCenter>
            <Image style={themedStyles.img} source={logo} />
            <LayoutCustom itemsCenter mt={theme.margins.large}>
              <Text style={themedStyles.title} >Recupero de contraseña</Text>
              <Text style={themedStyles.subTitle} numberOfLines={2}>Ingrese su email y le enviaremos un codigo de 4 digitos</Text>
            </LayoutCustom>
            <LayoutCustom pv={theme.paddings.large} justify="space-around" style={themedStyles.inputContainer}>
              <TextInput placeholder="Email" value={email} onChangeText={handleEmail} placeholderTextColor={"#ffffff"} style={themedStyles.input} />
            </LayoutCustom>
          </LayoutCustom>
          <LayoutCustom mt={theme.margins.xSmall}>
            <TouchableOpacity style={themedStyles.buttonContainer} onPress={() => router.push({ pathname: '/auth/confirmPassword', params: { value: email } })}>
              <Text style={themedStyles.loginText}>Enviar</Text>
            </TouchableOpacity>
          </LayoutCustom>
        </LayoutCustom>
      </ImageBackground>
    </Container>
  )
}

export default Auth

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  img: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.13,
  },
  background: {
    height: windowHeight,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subTitle: {
    textAlign: 'center',
    lineHeight: 25,
    color: 'white',
    fontSize: theme.fontSizes.medium
  },
  inputContainer: {
    height: windowHeight * 0.37,
    width: '100%'
  },
  input: {
    borderBottomWidth: 1,
    height: windowHeight * 0.07,
    borderColor: '#ffffff',
    color: '#ffffff',
    fontSize: theme.fontSizes.medium,
    paddingBottom: theme.paddings.small,
    fontWeight: "bold",
    width: '100%'
  },
  buttonContainer: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    padding: theme.paddings.xMedium,
    borderRadius: theme.borderRadius.medium,
    width: windowWidth * 0.6,
    alignSelf: "center"
  },
  forgottenPasswordText: {
    color: theme.colors.forgoten_password_Text
  },
  forgotPasswordContainer: {
    alignItems: 'center'
  },
  loginText: {
    color: 'white',
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red'
  }
});