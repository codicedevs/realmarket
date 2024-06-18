import { Icon, StyleService } from "@ui-kitten/components";
import { Redirect, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import Container from "../../components/Container";
import LayoutCustom from "../../components/LayoutCustom";
import { useSession } from "../../context/AuthProvider";
import { useLoading } from "../../context/LoadingProvider";
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
    username: yup.string().required("Requerido").min(6, 'El usuario debe tener al menos 6 caracteres'),
    pass: yup.string().required("Requerido").min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

const Auth = () => {
    const resolver = useYupValidationResolver(validationSchema)
    const background = require("../../assets/Login/fondoLogin.png")
    const logo = require("../../assets/Login/rm-logo.png")
    const { signIn, session, checkSession } = useSession()
    const [visibility, setVisibility] = useState(true)
    const { setLoadingScreen, loadingScreen } = useLoading()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver })

    const onSubmit = (data) => {
        try {
            setLoadingScreen(true)
            signIn(data.username.toLowerCase(), data.pass)
        } catch (err) {
            console.log(err, 'here')
        } finally {
            setTimeout(() => {
                setLoadingScreen(false)
            }, 2000);
        }
    };

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

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
                            <Text style={themedStyles.title} >¡Bienvenido!</Text>
                            <Text style={themedStyles.subTitle} numberOfLines={2}>Ingrese su nombre de usuario y contraseña</Text>
                        </LayoutCustom>
                    </LayoutCustom>
                    <LayoutCustom pv={theme.paddings.large} justify="space-around" style={themedStyles.inputContainer}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Nombre de usuario"
                                    placeholderTextColor={"#ffffff"}
                                    onChangeText={(text) => {
                                        const cleanedValue = text.replace(/\s/g, '');
                                        onChange(cleanedValue);
                                    }}
                                    value={value}
                                    style={themedStyles.input}
                                />
                            )}
                            name="username"
                        />
                        <View style={{ minHeight: 10 }}>
                            {errors.username && <Text style={themedStyles.errorText}>{errors.username.message as string} </Text>}
                        </View>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <LayoutCustom horizontal style={{ position: 'relative' }}>
                                    <TextInput secureTextEntry={visibility} placeholder="Contraseña" placeholderTextColor={"#ffffff"} onChangeText={onChange} value={value} style={themedStyles.input} />
                                    <TouchableOpacity onPress={toggleVisibility}>
                                        <Icon
                                            pack="eva"
                                            name={visibility ? 'eye-outline' : 'eye-off-outline'}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                zIndex: 100,
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </LayoutCustom>
                            )}
                            name="pass"
                        />
                        <View style={{ minHeight: 10 }}>
                            {errors.username && <Text style={themedStyles.errorText}>{errors.pass?.message as string} </Text>}
                        </View>
                    </LayoutCustom>
                    <LayoutCustom mt={theme.margins.xSmall}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={themedStyles.buttonContainer} >
                            <Text style={themedStyles.loginText}>Login</Text>
                        </TouchableOpacity>
                        <LayoutCustom mt={theme.margins.small} style={themedStyles.forgotPasswordContainer}>
                            <TouchableOpacity onPress={() => router.navigate('/auth/recoverPassword')}>
                                <Text style={themedStyles.forgottenPasswordText}>¿Olvidó su contraseña?</Text>
                            </TouchableOpacity>
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
        fontFamily: 'Lato-Bold'
    },
    subTitle: {
        textAlign: 'center',
        lineHeight: 25,
        color: 'white',
        fontSize: theme.fontSizes.medium,
        fontFamily: 'Lato-Regular'
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
        width: '100%',
        fontFamily: 'Lato-Bold'
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
        color: theme.colors.forgoten_password_Text,
        fontFamily: 'Lato-Regular'
    },
    forgotPasswordContainer: {
        alignItems: 'center'
    },
    loginText: {
        color: 'white',
        fontSize: theme.fontSizes.large,
        fontFamily: 'Lato-Bold'
    },
    errorText: {
        color: 'red',
        fontFamily: 'Lato-Regular'
    }
});