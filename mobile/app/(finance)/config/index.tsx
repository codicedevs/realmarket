import React, { useState } from 'react';
// import Text from '../../../components/Text'
import { Icon, StyleService, TopNavigation } from '@ui-kitten/components';
import { Dimensions, Image, ImageBackground, Modal, Pressable, Text, TextInput, View } from 'react-native';
import ConfigButton from '../../../components/Buttons/ConfigButton';
import RoundedButton from '../../../components/Buttons/RoundedButton';
import Container from '../../../components/Container';
import LayoutCustom from '../../../components/LayoutCustom';
import { useSession } from '../../../context/AuthProvider';
import theme from '../../../utils/theme';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConfigScreen = () => {
  const iniciales = require('../../../assets/background/portaIniciales.png')
  const background = require('../../../assets/background/separador.png')
  const password = require('../../../assets/Icons/changePassword.png')
  const logOut = require('../../../assets/Icons/logOutIcon.png')
  const mail = require('../../../assets/Icons/mailIcon.png')
  const whatsapp = require('../../../assets/Icons/whatsappIcon.png')
  const backgroundModal = require('../../../assets/background/backgroundIlustration.png')
  const [open, setOpen] = useState(false)
  const {signOut} = useSession()

  const toggleModal = () => {
    setOpen(!open)
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={open}
        transparent={true}
        onRequestClose={() => setOpen(false)}
      >
        <LayoutCustom style={themedStyles.centeredView}>
          <ImageBackground source={backgroundModal} style={themedStyles.modalView}>
            <LayoutCustom mb={theme.margins.large}>
              <Text style={themedStyles.modalTitle}>Cambiar contraseña</Text>
              <Text style={themedStyles.modalSubtitle}>Nueva contraseña</Text>
              <View style={themedStyles.inputIconWrapper}>
                <TextInput style={themedStyles.modalInput} />
                <Icon
                  pack="eva"
                  name={'eye'}
                  style={themedStyles.inputIcon}
                />
              </View>
            </LayoutCustom>
            <LayoutCustom>
              <Pressable
                style={[themedStyles.button, themedStyles.buttonConfirm]}
                onPress={toggleModal}
              >
                <Text style={themedStyles.textStyle}>Confirmar</Text>
              </Pressable>
              <Pressable
                style={[themedStyles.button, themedStyles.buttonClose]}
                onPress={toggleModal}
              >
                <Text style={themedStyles.textStyle}>Cancelar</Text>
              </Pressable>
            </LayoutCustom>
          </ImageBackground>
        </LayoutCustom>
      </Modal>
      <Container style={{ flex: 1 }}>
        <TopNavigation
          alignment="center"
          title="Home"
          style={themedStyles.topNavigation}
          accessoryLeft={() => (
            <RoundedButton icon="arrow-back-outline" />
          )}
          accessoryRight={() => <RoundedButton icon="person-outline" />}
        />
        <ImageBackground style={themedStyles.initialsContainer} source={iniciales}>
          <Text style={themedStyles.initials}>PT</Text>
        </ImageBackground>
        <LayoutCustom pt={5} itemsCenter style={themedStyles.infoContainer}>
          <Text style={themedStyles.nameText}>Rodrigo guiterrez</Text>
          <Text style={themedStyles.userName}>#Rodrigo </Text>
          <Text style={themedStyles.account}>0129</Text>
        </LayoutCustom>
        <View style={themedStyles.imageContainer}>
          <Image
            source={background}
            style={themedStyles.imageResize}
          />
        </View>
        <LayoutCustom ph={theme.paddings.large} style={themedStyles.buttonsContainer}>
          <LayoutCustom>
            <TextInput placeholder="Email" placeholderTextColor={"gray"} style={themedStyles.input} />
            <TextInput placeholder="Nombre de usuario" placeholderTextColor={"gray"} style={themedStyles.input} />
          </LayoutCustom>
          <LayoutCustom mt={theme.margins.medium}>
            <ConfigButton onPress={toggleModal} title={"Cambiar contraseña"} icon={password} />
            <ConfigButton onPress={() => console.log(1)} title={"Enviar whatsapp"} icon={whatsapp} />
            <ConfigButton onPress={() => console.log(1)} title={"Enviar email"} icon={mail} />
            <ConfigButton onPress={signOut} title={"Logout"} icon={logOut} />
          </LayoutCustom>
        </LayoutCustom>
      </Container>
    </>
  )
}

export default ConfigScreen

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
    backgroundColor: theme.colors.background
  },
  input: {
    borderBottomWidth: 1,
    height: windowHeight * 0.06,
    borderColor: 'gray',
    color: '#5A5959',
    fontSize: theme.fontSizes.small,
    paddingBottom: theme.paddings.xSmall,
    fontWeight: "bold"
  }, centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalInput: {

    fontSize: theme.fontSizes.small,
    paddingBottom: theme.paddings.xSmall,
    flex: 1
  },
  modalView: {
    width: windowWidth * 0.85,
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.paddings.medium,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: theme.paddings.large
  },
  button: {
    borderRadius: theme.borderRadius.medium,
    padding: theme.paddings.xSmall,
    elevation: 2,
    width: windowWidth * 0.4,
    alignSelf: 'center',
    marginBottom: theme.margins.small
  },
  buttonConfirm: {
    backgroundColor: '#009F9F',
  },
  buttonClose: {
    backgroundColor: '#D0682E'
  },
  modalTitle: {
    textAlign: 'center',
    color: 'black',
    margin: theme.margins.xSmall,
    fontSize: theme.fontSizes.caption
  },
  modalSubtitle: {
    textAlign: 'center',
    color: 'black',
    margin: theme.margins.xSmall,
    fontSize: theme.fontSizes.label,
    marginTop: theme.margins.small
  },
  modalText: {
    textAlign: 'center',
    color: 'black',
    margin: theme.margins.xSmall
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  inputIcon: {
    height: 20,
    width: 20
  },
  imageContainer: {
    height: windowHeight * 0.05,
    backgroundColor: theme.colors.background,
    width: windowWidth
  },
  initialsContainer: {
    height: windowHeight * 0.15,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center"
  },
  initials: {
    fontSize: 60,
    color: 'white'
  },
  infoContainer: {
    height: windowHeight * 0.12,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 21,
    color: '#D0682E'
  },
  userName: {
    fontSize: 18,
    color: 'white'
  },
  account: {
    fontSize: 15,
    color: 'white'
  },
  imageResize: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
  buttonsContainer: {
    backgroundColor: "#FAFCFC",
    height: '100%'
  }
});