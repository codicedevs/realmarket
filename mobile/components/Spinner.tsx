import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import theme from '../utils/theme';

const Spinner = ({ show }) => {
  if (!show) return null

  return (
    <View style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0, 0.5)', justifyContent: 'center', alignContent: 'center', zIndex: 100, height: '100%', width: '100%' }}>
      <ActivityIndicator size={"large"} color={theme.colors.white} />
    </View>
  )
}

export default Spinner