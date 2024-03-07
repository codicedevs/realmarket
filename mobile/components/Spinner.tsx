import React from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import theme from '../utils/theme';
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const Spinner = ({show}) => {
  if(!show) return null

  return (
    <View style={{position:'absolute' , backgroundColor: 'rgba(191,191,191, 0.9)', justifyContent:'center', alignContent:'center', zIndex: 100, height: windowHeight, width: windowWidth }}>
      <Text style={{textAlign:'center'}}>
        <ActivityIndicator size={"large"} color={theme.colors.background} />
        </Text>
    </View>
  )
}

export default Spinner