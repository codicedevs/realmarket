import { Stack } from "expo-router";
import React from "react";
import theme from "../../utils/theme";


const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='recoverPassword' options={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }} />
      <Stack.Screen name="index" options={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }} />
      <Stack.Screen name="confirmPassword" options={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }} />
      <Stack.Screen name='login' options={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }} />
    </Stack>
  )
};

export default AuthLayout