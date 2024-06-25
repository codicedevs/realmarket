import { Icon, StyleService } from "@ui-kitten/components";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as yup from "yup";
import Container from "../../components/Container";
import LayoutCustom from "../../components/LayoutCustom";
import { useLoading } from "../../context/LoadingProvider";
import userService from "../../service/user.service";
import { notification } from "../../utils/notification";
import theme from "../../utils/theme";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError?.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )

const validationSchema = yup.object({
  code: yup.string().required("Requerido").min(5, 'El codigo debe contiene 5 caracteres').matches(/^[0-9]{5}$/, "El código debe contener 5 números"),
  pass: yup.string().required("Requerido").min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

const Auth = () => {
  const resolver = useYupValidationResolver(validationSchema)
  const background = require("../../assets/Login/fondoLogin.png")
  const logo = require("../../assets/Login/rm-logo.png")
  const value = useLocalSearchParams()
  const { setLoadingScreen } = useLoading()

  const toBeggining = () => {
    router.push({ pathname: '/auth' })
  }

  const onSubmit = async (data) => {
    setLoadingScreen(true)
    try {
      await userService.resetPassword({
        resetKey: data.code,
        email: value.value,
        password: data.pass
      })
      notification('Contraseña cambiada con exito')
      router.push({ pathname: '/auth' })
    } catch (e) {
      console.error(e)
      notification('Hubo un problema')
    } finally {
      setLoadingScreen(false)
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver })

  //cambiar que no sea con value.value
  return (
    <Container style={themedStyles.container}>
      <ImageBackground style={themedStyles.background} source={background}>
        <View style={{ paddingLeft: 10, paddingTop: 5 }}>
          <TouchableWithoutFeedback onPress={toBeggining}>
            <Icon
              pack="eva"
              name={"arrow-back-outline"}
              style={{
                width: 30,
                height: 30,
                zIndex: 100,
                padding: 10
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <LayoutCustom ph={theme.paddings.large} pv={theme.paddings.xlarge}>
          <LayoutCustom itemsCenter>
            <Image style={themedStyles.img} source={logo} />
            <LayoutCustom alignSelfCenter mt={theme.margins.large}>
              <Text style={themedStyles.title} >Recupero de contraseña de</Text>
              <Text style={themedStyles.titleEmail}>{value.value}</Text>
            </LayoutCustom>
            <LayoutCustom pv={theme.paddings.large} justify="space-around" style={themedStyles.inputContainer}>
              {/* <TextInput placeholder="Email" placeholderTextColor={"#ffffff"} style={themedStyles.input} /> */}
              <Controller
                control={control}
                rules={{ required: true }}
                name='code'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput placeholder="Codigo" onChangeText={onChange} value={value} placeholderTextColor={"#ffffff"} style={themedStyles.input} />
                )}
              />
              <View style={{ minHeight: 30, justifyContent: "center" }}>
                {errors.code && <Text style={themedStyles.errorText}>{errors.code?.message as string} </Text>}
              </View>
              <Controller
                control={control}
                rules={{ required: true }}
                name='pass'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput placeholder="Nueva contraseña" onChangeText={onChange} value={value} placeholderTextColor={"#ffffff"} style={themedStyles.input} />
                )}
              />
              <View style={{ minHeight: 30, justifyContent: "center" }}>
                {errors.pass && <Text style={themedStyles.errorText}>{errors.pass?.message as string} </Text>}
              </View>
            </LayoutCustom>
          </LayoutCustom>
          <LayoutCustom mt={theme.margins.xSmall}>
            <TouchableOpacity style={themedStyles.buttonContainer} onPress={handleSubmit(onSubmit)}  >
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
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Lato-Regular'
  },
  titleEmail: {
    color: 'lightgrey',
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Lato-Regular'
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
    width: '100%',
    fontFamily: 'Lato-Regular'

  },
  buttonContainer: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    padding: theme.paddings.xMedium,
    borderRadius: theme.borderRadius.medium,
    width: windowWidth * 0.5,
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
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular'
  },
  errorText: {
    color: 'red',
    fontFamily: 'Lato-Regular'
  }
});