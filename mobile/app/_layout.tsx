import * as eva from '@eva-design/eva';
import { RealmProvider } from '@realm/react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ContainerArs, ContainerUsd, Movimiento, Position, PositionDetail } from '../Realm/Schemas';
import AppProvider from '../context/AppContext';
import { SessionProvider } from "../context/AuthProvider";
import { InfoProvider } from '../context/InfoProvider';
import { LoadingProvider } from "../context/LoadingProvider";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <RealmProvider schema={[Movimiento, ContainerUsd, ContainerArs, Position, PositionDetail]} schemaVersion={6}>
          {/* tengo que ir subiendo la version por cada cambio de esquema */}
          <RootSiblingParent>
            <IconRegistry icons={EvaIconsPack} />
            <AppProvider>
              <SessionProvider>
                <LoadingProvider>
                  <InfoProvider>
                    <Stack>
                      <Stack.Screen name='(finance)' options={{ headerShown: false }} />
                      <Stack.Screen name="auth" options={{ headerShown: false }} />
                    </Stack>
                  </InfoProvider>
                </LoadingProvider>
              </SessionProvider>
            </AppProvider>
          </RootSiblingParent>
        </RealmProvider>
      </ApplicationProvider>
    </GestureHandlerRootView>
  )
};

export default RootLayout