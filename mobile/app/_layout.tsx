import { Stack } from "expo-router";
import { SessionProvider } from "../context/AuthProvider";
import React from "react"
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const RootLayout = () => {
    return (
        <ApplicationProvider {...eva} theme={eva.dark}>
            <IconRegistry icons={EvaIconsPack} />
            <SessionProvider>
                <Stack>
                    <Stack.Screen name='(finance)' options={{ headerShown: false }} />
                    <Stack.Screen name="auth/index" options={{ headerShown: false }} />
                </Stack>
            </SessionProvider>
        </ApplicationProvider>
    )
};

export default RootLayout