import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import AppProvider from '../context/AppContext';
import { SessionProvider } from "../context/AuthProvider";
import { LoadingProvider } from "../context/LoadingProvider";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <RootSiblingParent>
          <IconRegistry icons={EvaIconsPack} />
          <AppProvider>
            <SessionProvider>
              <LoadingProvider>
                <Stack>
                  <Stack.Screen name='(finance)' options={{ headerShown: false }} />
                  <Stack.Screen name="auth" options={{ headerShown: false }} />
                </Stack>
              </LoadingProvider>
            </SessionProvider>
          </AppProvider>
        </RootSiblingParent>
      </ApplicationProvider>
    </GestureHandlerRootView>
  )
};

export default RootLayout