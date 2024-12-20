import { Avatar, Icon, StyleService, useTheme } from '@ui-kitten/components';
import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { IRoundedButtonProps } from '../../types/component-types';



const RoundedButton = React.memo(
  ({
    onPress,
    status = 'placeholder',
    icon,
    size = 56,
    activeOpacity = 0.7,
    style,
    children,
    img
  }: IRoundedButtonProps) => {
    const theme = useTheme();

    const getColor = () => {
      switch (status) {
        case 'basic':
          return theme['color-primary-default'];
        case 'primary':
          return theme['color-primary-300'];
        case 'placeholder':
          return `${theme['color-primary-default']}30`;
        case 'transparent':
          return theme['color-primary-default'];
      }
    };
    const getTintColor = () => {
      switch (status) {
        case 'basic':
          return theme['text-basic-color'];
        case 'primary':
          return theme['text-basic-color'];
        case 'placeholder':
          return theme['color-primary-default'];
        case 'transparent':
          return theme['text-basic-color'];
      }
    };
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        style={[
          {
            width: size,
            height: size,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}>
        <Avatar
          shape="rounded"
          source={require('../../assets/img_rounded.png')}
          style={{
            width: size,
            height: size,
            tintColor: getColor(),
            zIndex: -10,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
        {status === 'transparent' && (
          <Avatar
            shape="rounded"
            source={require('../../assets/img_rounded.png')}
            style={{
              width: size - 2,
              height: size - 2,
              tintColor: theme['background-basic-color-1'],
              zIndex: -10,
              position: 'absolute',
              top: 1,
              left: 1,
              right: 1,
              bottom: 1,
            }}
          />
        )}
        {icon && (
          <Icon
            pack="eva"
            name={icon}
            style={{
              width: 20,
              height: 20,
              zIndex: 100,
              tintColor: getTintColor()
            }}
          />
        )}
        {
          img && (
            <Image
              source={img}
              style={{
                width: 20,
                height: 20
              }}
            />
          )
        }
        {children && children}
      </TouchableOpacity>
    );
  },
);

export default RoundedButton;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
