import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { LayoutCustom, Text } from 'components'
import { Image, ImageBackground } from 'react-native';
import React from 'react'
import theme from 'theme';

interface CreditCardProps {
  color: string;
  balance: number;
  card_number: string;
  icon: string
}

const TimeCard = ({ item }: { item: CreditCardProps }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <LayoutCustom style={{
      ...styles.card
    }}>
      <ImageBackground style={{ height: '100%', backgroundColor: item.color, borderRadius: 10 }} source={require("../../../../assets/images/icons/colorful-background.png")}>
        <LayoutCustom alignSelfCenter itemsCenter padding={theme.paddings.medium} style={{marginTop: theme.margins.small}}>
          <Image style={{height: theme.image.big, width: theme.image.big}} source={item.icon} />
          <Text marginTop={10} fontSize={18}>$1.323.434,00</Text>
        </LayoutCustom>
      </ImageBackground>
    </LayoutCustom>
  )
}

export default TimeCard

const themedStyles = StyleService.create({
  card: {
    borderRadius: 16,
    marginVertical: 16,
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
});