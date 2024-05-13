import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import theme from '../utils/theme';
import RoundedButton from './Buttons/RoundedButton';
const windowHeight = Dimensions.get("window").height;
export const headerHeight = windowHeight * 0.1
const Header = ({ title }) => {
  const isHome = title.includes('Hola') 
  const configRoute = () => {
    router.replace('config')
  }
  
  return (
    <View style={{...styles.container, justifyContent: !isHome ? 'space-between' : 'flex-start'}}>
      {!isHome && <RoundedButton icon="arrow-back-outline" onPress={() => router.back()} />}
      {!isHome && <Text style={styles.title}>{title}</Text>}
      <RoundedButton icon="person-outline" onPress={() => configRoute()} />
      {isHome && <Text style={{...styles.title, paddingLeft: 20}}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.paddings.medium,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSizes.caption,
    // fontWeight: 'bold',
    color: '#ffff',
  },
});
export default Header;