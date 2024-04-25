import * as eva from '@eva-design/eva';
import { RealmProvider } from '@realm/react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from "expo-router";
import React from "react";
import { RootSiblingParent } from 'react-native-root-siblings';
import { ContainerArs, ContainerUsd, Movimiento, Position, PositionDetail } from '../Realm/Schemas';
import AppProvider from '../context/AppContext';
import { SessionProvider } from "../context/AuthProvider";
import { LoadingProvider } from "../context/LoadingProvider";

const RootLayout = () => {
    return (
        <ApplicationProvider {...eva} theme={eva.dark}>
            <RealmProvider schema={[Movimiento, ContainerUsd, ContainerArs, Position, PositionDetail]} schemaVersion={4}>
                <RootSiblingParent>
                    <IconRegistry icons={EvaIconsPack} />
                    <AppProvider>
                        <SessionProvider>
                            <LoadingProvider>
                                <Stack>
                                    <Stack.Screen name='(finance)' options={{ headerShown: false }} />
                                    <Stack.Screen name="auth/index" options={{ headerShown: false }} />
                                </Stack>
                            </LoadingProvider>
                        </SessionProvider>
                    </AppProvider>
                </RootSiblingParent>
            </RealmProvider>
        </ApplicationProvider>
    )
};

export default RootLayout