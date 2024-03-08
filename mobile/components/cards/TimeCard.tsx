import { StyleService } from '@ui-kitten/components';
import React from 'react';
import { Image, ImageBackground, Text } from 'react-native';
import { currencyFormat } from '../../utils/number';
import theme from '../../utils/theme';
import LayoutCustom from '../LayoutCustom';

interface CreditCardProps {
  color: string;
  balance: number;
  card_number: string;
  icon: string
}

const TimeCard = ({ item }: { item: CreditCardProps }) => {
  return (
        <LayoutCustom style={themedStyles.card}>
          <ImageBackground style={{ ...themedStyles.imageBack, backgroundColor: item.color }} source={require("../../assets/background/colorful-background.png")}>
            <LayoutCustom alignSelfCenter itemsCenter padding={theme.paddings.medium} style={themedStyles.textContainer}>
              <Image style={themedStyles.image} source={item.icon} />
              <Text style={{ color: 'white', fontSize:33, paddingVertical: theme.margins.small, marginBottom: 15 }} >{`$ ${currencyFormat(item.balance)}`}</Text>
            </LayoutCustom>
          </ImageBackground>
        </LayoutCustom>
  )
}

export default TimeCard

const themedStyles = StyleService.create({
  card: {
    borderRadius: 25,
    // marginVertical: 16,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    marginRight: theme.margins.small,
    height: '85%'
  },
  imageBack: {
    height: '100%',
    borderRadius: 5
  },
  textContainer: {
    marginTop: theme.margins.small
  },
  image: { height: theme.image.big, width: theme.image.big }
});

