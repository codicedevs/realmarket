import { StyleService } from "@ui-kitten/components";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";
import Container from "../../components/Container";
import { useSession } from "../../context/AuthProvider";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Auth = () => {
    const background = require("../../assets/Login/fondoLogin.png")
    const logo = require("../../assets/Login/rm-logo.png")
    const [isAllowed, setIsAllowed] = useState()
    const { signIn, session, checkSession } = useSession()
    const [visibility, setVisibility] = useState(true)


    const checkingAll = async () => {
        const what = await checkSession()
        // setIsAllowed(what)
        if (what) {
            router.navigate('/(finance)')
        } else {
            router.navigate('/auth/login')
        }
    }


    useEffect(() => {
        setTimeout(() => {
            checkingAll()
        }, 2000);
    }, [])



    return (
        <Container style={{ backgroundColor: "white", alignItems: 'center' }}>
            <Image
                source={require('../../assets/rm-negro.png')}
                resizeMode="contain"
                style={{
                    width: windowWidth,
                    height: '100%'
                }}
            />
        </Container>
    )

}

export default Auth

const themedStyles = StyleService.create({});