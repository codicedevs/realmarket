import { StyleService } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Modal, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import LayoutCustom from './LayoutCustom'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const disponibilidadGif = require('../assets/gif/disponibilidad.gif')
const estadisticasGif = require('../assets/gif/Statistics.gif')

const animations = [
  disponibilidadGif,
  estadisticasGif
]

const textos = [
  "Sus datos estan siendo cargados",
  "Recuerde no compartir sus datos personales",
  "Buenas noches",
  "Buenas tardes "
]

const duracionDeText = 8000

const LoaderModal = ({ show }) => {
  if (!show) return null

  const animation = useRef(null);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0)
  const animationOpacity = useSharedValue(1)
  const [isLoading, SetIsLoading] = useState(true)
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: withSpring(translateX.value) }],
  }));

  const animateAnimation = useAnimatedStyle(() => ({
    opacity: animationOpacity.value
  }))

  const startTextAnimation = () => {
    translateX.value = withSequence(
      withTiming(windowWidth * 0.6, { duration: 500 }),
      withDelay(duracionDeText - 1000, withTiming(300, { duration: 500 })),
      withTiming(0, { duration: 0 })
    );

    opacity.value = withSequence(
      withTiming(1, { duration: 500 }),
      withDelay(duracionDeText - 1000, withTiming(0, { duration: 300 })),
      withTiming(0, { duration: 0 })
    );
  };

  const startAnimationChange = () => {
    animationOpacity.value = withSequence(
      withTiming(0, { duration: 500 }),
      withDelay(500, withTiming(1, { duration: 500 }))
    );
  };

  useEffect(() => {
    let interval;
    let animationInterval
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentTextIndex(prevIndex => (prevIndex + 1) % textos.length);
      }, duracionDeText);
      animationInterval = setInterval(() => {
        startAnimationChange();
        setTimeout(() => {
          setCurrentImageIndex(prevIndex => (prevIndex + 1) % animations.length);
        }, 1000);
      }, (duracionDeText * 3));
    } else {
      clearInterval(interval);
      clearInterval(animationInterval);
      setCurrentImageIndex(0)
      setCurrentTextIndex(0);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    startTextAnimation()
  }, [currentTextIndex])

  return (
    <Modal
      animationType="fade"
      visible={true}
      transparent={true}
    >
      <LayoutCustom style={themedStyles.centeredView}>
        <View style={themedStyles.modalView}>
          <View style={themedStyles.titleContainer}>
            <Text style={themedStyles.titleText}>Cargando datos</Text>
            <Text style={themedStyles.subtitleText}>Esto podria demorar unos momentos</Text>
          </View>
          <Animated.View style={[animateAnimation]}>
            <Image source={animations[currentImageIndex]} style={{ width: 200, height: 200, marginTop: 20 }} />
          </Animated.View>
          <Animated.View style={[animatedStyles, themedStyles.animatedText]}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ fontSize: 22, textAlign: "center" }}>{textos[currentTextIndex]}</Text>
            </View>
          </Animated.View>
          {/* <Button title='hola' onPress={handlePress} /> */}
        </View>
      </LayoutCustom>
    </Modal>
  )
}

export default LoaderModal

const themedStyles = StyleService.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    backgroundColor: "white",
    width: windowWidth * 0.9,
    height: windowHeight * 0.9,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  titleContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  animatedText: {
    position: 'absolute',
    top: '80%',
    left: "-75%",
    width: windowWidth * 0.8,
    alignItems: 'center',
    height: 'auto'
  },
  titleText: {
    fontFamily: 'Lato-Bold',
    fontSize: 23
  },
  subtitleText: {
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    marginBottom: 15
  }
});