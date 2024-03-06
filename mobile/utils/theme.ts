import { Dimensions } from 'react-native'

const dimensions = Dimensions.get('window')
const windowWidth = dimensions.width

export const baseFontSize = 16

const em = (value: number) => {
    const newValue = (value / baseFontSize) * windowWidth
    return newValue
}

const theme = {
    colors: {
        /** Verde oscuro */
        success: '#007B3E',
        /** Rojo oscuro */
        danger: '#D9190B',
        /** Amarillo/naranja claro */
        warning: '#FFBB00',
        /** Azul (ejemplo: nombre en comentarios) */
        info: '#0B7CAD',
        /** Gris claro */
        light: '#F1F1F1',
        /** Gris oscuro */
        dark: '#2E2E2E',
        /** azul oscuro */
        background: '#0E0D31',
        /** Negro */
        text: '#333333',
        /** Lavanda claro */
        forgoten_password_Text: "#d4d3f3",
        /** Gris (ejemplo: la fecha del detalle de la noticia) */
        label: '#757575',
        /** Blanco */
        white: '#FFFFFF',
        // un azul cielo para algunos textos
        skyBlue: '#009F9F',
        // azul oscuro para boton en home,
        darkBlue: '#252362',
        /** Purpura oscuro */
        violet: "#701BC4",
        /** azul claro */
        activeLabel: "#252362"
    },
    fonts: {
    },
    fontSizes: {
        extraSmall: em(0.60), // 10.4px
        small: em(0.75), // 12px
        medium: em(0.875), // 14px
        large: em(1), // 16px
        title: em(2), // 32px
        subtitle: em(1.25), // 20px
        header: em(1.125), // 18px
        body: em(1), // 16px
        caption: em(0.75), // 12px
        label: em(0.6)
    },
    margins: {
        xSmall: em(0.25),
        small: em(0.5), // 8px
        medium: em(1), // 16px
        large: em(1.5), // 24px
        xlarge: em(2), // 32px
    },
    paddings: {
        xSmall: em(0.25),
        small: em(0.5), // 8px
        xMedium: em(0.7),
        medium: em(1), // 16px
        large: em(1.5), // 24px
        xlarge: em(2), // 32px
    },
    borderRadius:{
        xSmall: em(0.25), // 4px
       small: em(0.5), // 4px
        medium: em(1),
        big: em(2)
    } ,
    image: {
        bigger: em(4.00),
        big: em(3.00),// 48px
        medium: em(2.00),
        small: em(1.00),
        xsmall: em(0.5)
    }
}

export default theme
