import { StyleService } from "@ui-kitten/components";
import { Redirect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import Container from "../../components/Container";
import LayoutCustom from "../../components/LayoutCustom";
import { useSession } from "../../context/AuthProvider";
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
    username: yup.string().required("Requerido"),
    pass: yup.string().required("Requerido"),
})

const Auth = () => {
    const resolver = useYupValidationResolver(validationSchema)
    const background = require("../../assets/Login/fondoLogin.png")
    const logo = require("../../assets/Login/rm-logo.png")
    const { signIn, session, checkSession } = useSession()
    const [user, setUser] = useState({
        username: "",
        pass: ""
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver })

    const logIn = () => {
        signIn(user.username, user.pass)
    }

    const onSubmit = (data) => {
        try {
            signIn(data.username, data.pass)
            // setSubmittedData(data);
        } catch (err) { console.error(err) }
    };

    useEffect(() => {
        checkSession()
    }, [])

    if (session) {
        return <Redirect href="/(finance)" />
    }

    return (
        <Container style={themedStyles.container}>
            <ImageBackground style={themedStyles.background} source={background}>
                <LayoutCustom ph={theme.paddings.large} pv={theme.paddings.xlarge}>
                    <LayoutCustom itemsCenter>
                        <Image style={themedStyles.img} source={logo} />
                        <LayoutCustom itemsCenter mt={theme.margins.large}>
                            <Text style={themedStyles.title} >Bienvenido!</Text>
                            <Text style={themedStyles.subTitle} numberOfLines={2}>Ingrese su nombre de usuario y contraseña</Text>
                        </LayoutCustom>
                    </LayoutCustom>
                    <LayoutCustom pv={theme.paddings.large} justify="space-around" style={themedStyles.inputContainer}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput placeholder="Nombre de usuario" placeholderTextColor={"#ffffff"} onChangeText={onChange} value={value} style={themedStyles.input} />
                            )}
                            name="username"
                        />
                        <View style={{ minHeight: 10 }}>
                            {errors.username && <Text style={themedStyles.errorText}>{errors.username?.message} </Text>}
                        </View>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput placeholder="Contraseña" placeholderTextColor={"#ffffff"} onChangeText={onChange} value={value} style={themedStyles.input} />
                            )}
                            name="pass"
                        />
                        <View style={{ minHeight: 10 }}>
                            {errors.username && <Text style={themedStyles.errorText}>{errors.pass?.message} </Text>}
                        </View>
                    </LayoutCustom>
                    <LayoutCustom mt={theme.margins.xSmall}>
                        <TouchableOpacity style={themedStyles.buttonContainer} >
                            <Text style={themedStyles.loginText} onPress={handleSubmit(onSubmit)}>LOGIN</Text>
                        </TouchableOpacity>
                        <LayoutCustom mt={theme.margins.small} style={themedStyles.forgotPasswordContainer}>
                            <Text style={themedStyles.forgottenPasswordText}>Olvido su contraseña?</Text>
                            <Text style={themedStyles.forgottenPasswordText}>O crear nueva cuenta?</Text>
                        </LayoutCustom>
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
        fontSize: theme.fontSizes.subtitle,
        fontWeight: 'bold'
    },
    subTitle: {
        textAlign: 'center',
        lineHeight: 25,
        color: 'white',
        fontSize: theme.fontSizes.medium
    },
    inputContainer: {
        height: windowHeight * 0.37
    },
    input: {
        borderBottomWidth: 1,
        height: windowHeight * 0.07,
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: theme.fontSizes.medium,
        paddingBottom: theme.paddings.small,
        fontWeight: "bold"
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