import { StyleService } from '@ui-kitten/components';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import theme from '../../utils/theme';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConfigButton = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress()} style={themedStyles.buttonContainer}>
            <Image resizeMode='center' style={{ height: 'auto', width: windowHeight * 0.03 }} source={icon} />
            <Text style={themedStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ConfigButton

const themedStyles = StyleService.create({
    buttonContainer: {
        backgroundColor: "#009F9F",
        marginVertical: 2,
        paddingHorizontal: theme.paddings.medium,
        paddingVertical: theme.paddings.small,
        borderRadius: theme.borderRadius.medium,
        flexDirection: 'row',
        height: windowHeight * 0.06
    },
    buttonText: {
        color: 'white',
        fontSize: theme.fontSizes.caption,
        marginLeft: theme.margins.small,
        fontFamily: 'Lato-Regular'
    }
});