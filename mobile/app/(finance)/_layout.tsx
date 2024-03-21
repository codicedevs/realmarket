import { StyleService } from '@ui-kitten/components'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Dimensions, Image, View } from 'react-native'
import { useSession } from '../../context/AuthProvider'
import theme from '../../utils/theme'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TabLayout = () => {
  const { session, isLoading } = useSession()

  if (!session) {
    return <Redirect href={"/auth"} />
  }

  const positionIcon = require("../../assets/Tab/positionIcon.png")
  const homeIcon = require("../../assets/Tab/homeIcon.png")
  const actionsIcon = require("../../assets/Tab/actionsIcon.png")

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.skyBlue,
        tabBarActiveTintColor: theme.colors.skyBlue,
        tabBarStyle: themedStyles.tabBarStyle,
        tabBarLabelStyle: themedStyles.tabBarLabel,
        headerShown: false,
        
      }}
    >
      <Tabs.Screen options={{
        title: "Home", tabBarIcon: ({ focused }) => (
          <View style={{ ...themedStyles.singleTabStyle, backgroundColor: focused ? theme.colors.activeLabel : theme.colors.background }}>
            <Image style={themedStyles.imageStyle} source={homeIcon} />
          </View>
        )
      }} name='home' />
      <Tabs.Screen options={{
        title: "Posiciones", tabBarIcon: ({ focused }) => (
          <View style={{ ...themedStyles.singleTabStyle, backgroundColor: focused ? theme.colors.activeLabel : theme.colors.background }}>
            <Image style={themedStyles.imageStyle} source={positionIcon} />
          </View>
        )
      }} name='position' />
      <Tabs.Screen options={{
        title: "Ordenes", tabBarIcon: ({ focused }) => (
          <View style={{ ...themedStyles.singleTabStyle, backgroundColor: focused ? theme.colors.activeLabel : theme.colors.background }}>
            <Image style={themedStyles.imageStyle} source={actionsIcon} />
          </View>
        )
      }} name='Orders' />
      <Tabs.Screen
        options={{
          href: null
        }}
        name='config/index' />
    <Tabs.Screen options={{href: null}} name='index' />
    </Tabs>
  )
}

export default TabLayout

const themedStyles = StyleService.create({
  tabBarStyle: {
    height: windowHeight * 0.1,
    backgroundColor: theme.colors.background,
    borderTopWidth: 0
  },
  tabBarLabel: {
    fontSize: theme.fontSizes.label,
    marginBottom: theme.margins.xSmall
  },
  singleTabStyle: {
    padding: theme.paddings.xSmall,
    borderRadius: theme.borderRadius.small,
    marginTop: theme.margins.xSmall
  },
  imageStyle: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.1
  }
});