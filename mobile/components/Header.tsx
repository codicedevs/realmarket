import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import theme from '../utils/theme';
import RoundedButton from './Buttons/RoundedButton';
const windowHeight = Dimensions.get("window").height;
export const headerHeight = windowHeight * 0.1

const Header = ({ title }) => {
  const configRoute = () => {
    router.replace('config')
  }

  return (
    <View style={styles.container}>
      <RoundedButton icon="arrow-back-outline" />
      <Text style={styles.title}>{title}</Text>
      <RoundedButton icon="person-outline" onPress={() => configRoute()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
