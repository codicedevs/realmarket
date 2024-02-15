import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { LayoutCustom, Text } from 'components';
import React from 'react';
import { Image, ImageBackground } from 'react-native';
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
      <ImageBackground style={{ ...styles.imageBack, backgroundColor: item.color }} source={require("../../../../assets/images/icons/colorful-background.png")}>
        <LayoutCustom alignSelfCenter itemsCenter padding={theme.paddings.medium} style={styles.textContainer}>
          <Image style={themedStyles.image} source={item.icon} />
          <Text marginTop={theme.margins.small} fontSize={23} category='t5'>$1.323.434,00</Text>
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