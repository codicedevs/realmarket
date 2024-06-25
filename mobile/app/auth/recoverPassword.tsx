import { Icon, StyleService } from "@ui-kitten/components";
import { router } from "expo-router";
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
        });

        return {
          values,
          errors: {},
        };
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
        };
      }
    },
    [validationSchema]
  );

// Ejemplo de uso del validador con Yup
const validationSchema = yup.object({
  email: yup.string().required("Requerido")
});

const Auth = () => {
  const { setLoadingScreen } = useLoading()
  const resolver = useYupValidationResolver(validationSchema)
  const background = require("../../assets/Login/fondoLogin.png")
  const logo = require("../../assets/Login/rm-logo.png")
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver })

  const onSubmit = async (data) => {
    setLoadingScreen(true)
    try {
      await userService.recoverPassword(data)
      router.push({ pathname: '/auth/confirmPassword', params: { value: data.email } })
    }
    catch (e) {
      notification("Ocurrio un problema")
    }
    finally {
      setLoadingScreen(false)
    }
  }

  const toBeggining = () => {
    router.push({ pathname: '/auth' })
  }

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
            <LayoutCustom itemsCenter mt={theme.margins.large}>
              <Text style={themedStyles.title} >Recupero de contraseña</Text>
              <Text style={themedStyles.subTitle} numberOfLines={2}>Ingrese su email y le enviaremos un codigo de 4 digitos</Text>
            </LayoutCustom>
            <LayoutCustom pv={theme.paddings.large} justify="space-around" style={themedStyles.inputContainer}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  //entre y seguia estando el email q escribi antes
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={"#ffffff"}
                    onChangeText={(text) => {
                      const cleanedValue = text.replace(/\s/g, '');
                      onChange(cleanedValue);
                    }}
                    value={value}
                    style={themedStyles.input}
                  />
                )}
                name="email"
              />
              {/* <TextInput placeholder="email" value={email} onChangeText={handleEmail} placeholderTextColor={"#ffffff"} style={themedStyles.input} /> */}
              <View style={{ minHeight: 10, alignSelf: 'center' }}>
                {errors.email && <Text style={themedStyles.errorText}>{errors.email.message as string} </Text>}
              </View>
            </LayoutCustom>
          </LayoutCustom>
          <LayoutCustom mt={theme.margins.xSmall}>
            <TouchableOpacity style={themedStyles.buttonContainer} onPress={handleSubmit(onSubmit)}>
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
    marginBottom: 10,
    fontFamily: 'Lato-Bold'
  },
  subTitle: {
    textAlign: 'center',
    lineHeight: 25,
    color: 'white',
    fontSize: theme.fontSizes.small,
    fontFamily: 'Lato-Regular'
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