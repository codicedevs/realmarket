import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import theme from '../utils/theme';
import RoundedButton from './Buttons/RoundedButton';
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export const headerHeight = windowHeight * 0.1
const Header = ({ title }) => {
  const isHome = title.includes('Hola')
  const isConfig = title.includes('Configuración')
  const image = require('../assets/Icons/reloadIcon.png')
  const configRoute = () => {
    router.replace('config')
  }

  return (
    <View style={styles.container}>
      <View style={{ width: windowWidth * 0.3, alignItems: 'center' }}>
        {!isHome && <RoundedButton icon="arrow-back-outline" onPress={() => router.back()} />}
      </View>
      <View style={{ width: windowWidth * 0.4, alignItems: 'center' }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ width: windowWidth * 0.3, alignItems: 'center' }}>
        {
          !isConfig && <RoundedButton icon="person-outline" onPress={() => configRoute()} />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: theme.paddings.medium,
    backgroundColor: theme.colors.background,
    width: windowWidth
  },
  title: {
    fontSize: theme.fontSizes.caption,
    // fontWeight: 'bold',
    color: '#ffff',
    fontFamily: 'Lato-Regular'
  },
});
export default Header;