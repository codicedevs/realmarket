import { Stack } from "expo-router";
import React from "react";


const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='recoverPassword' options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="confirmPassword" options={{ headerShown: false }} />
    </Stack>
  )
};

export default AuthLayout