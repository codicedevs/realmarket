import React, { useState } from 'react';
// import Text from '../../../components/Text'
import { Icon, StyleService } from '@ui-kitten/components';
import * as Linking from 'expo-linking';
import { Dimensions, Image, ImageBackground, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';
import ConfigButton from '../../../components/Buttons/ConfigButton';
import Container from '../../../components/Container';
import Header from '../../../components/CustomHeader';
import LayoutCustom from '../../../components/LayoutCustom';
import { useSession } from '../../../context/AuthProvider';
import userService from '../../../service/user.service';
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
  const { signOut, session } = useSession()
  const name = session.nombre.split(' ')[0]
  const lastName = session.nombre.split(' ')[1]
  const [changePasswordInfo, setChangePasswordInfo] = useState({
    newPass: '',
    currentPass: ''
  })
  const [userInfo, setUserInfo] = useState({
    email: session.email,
    telefono: session.telefono
  })
  const [editEmail, setEditEmail] = useState(false)
  const [editPhone, setEditPhone] = useState(false)

  const toggleModal = () => {
    setOpen(!open)
  }

  const handleChange = name => text => {
    setChangePasswordInfo(prevState => ({
      ...prevState,
      [name]: text
    }));
  };

  const handleUserInfoChange = name => text => {
    setUserInfo(prevState => ({
      ...prevState,
      [name]: text
    }))
  }

  const sendWhatsapp = () => {
    Linking.openURL('https://wa.me/3413110700')
  }

  const sendEmail = () => {
    Linking.openURL('mailto:mtrovant@gmail.com')
  }

  const notification = (texto: string) => {
    Toast.show(texto, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  const changePassword = async () => {
    try {
      await userService.ChangePassword(changePasswordInfo)
      notification('Contraseña cambiada con exito')
    } catch (e) {
      console.error(e)
      notification('Hubo un problema')
    } finally {
      toggleModal()
    }
  }

  const editUserInfo = async (field: keyof IUser) => {
    try {
      await userService.editUser({
        id: session._id,
        body: { [field]: userInfo[field] }
      })
    }
    catch (e) {
      console.error(e)
    }
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
              <View style={{ justifyContent: 'space-between', height: windowHeight * 0.13 }}>
                <View style={themedStyles.inputIconWrapper}>
                  <TextInput value={changePasswordInfo.currentPass} onChangeText={handleChange('currentPass')} placeholder='Contraseña actual' style={themedStyles.modalInput} />
                  <Icon
                    pack="eva"
                    name={'eye'}
                    style={themedStyles.inputIcon}
                  />
                </View>
                <View style={themedStyles.inputIconWrapper}>
                  <TextInput value={changePasswordInfo.newPass} onChangeText={handleChange('newPass')} placeholder='Nueva contraseña' style={themedStyles.modalInput} />
                  <Icon
                    pack="eva"
                    name={'eye'}
                    style={themedStyles.inputIcon}
                  />
                </View>
              </View>
            </LayoutCustom>
            <LayoutCustom>
              <Pressable
                style={[themedStyles.button, themedStyles.buttonConfirm]}
                onPress={changePassword}
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
        <Header title={'Configuración'} />
        <ImageBackground style={themedStyles.initialsContainer} source={iniciales}>
          <Text style={themedStyles.initials}>{name[0]}</Text>
          <Text style={themedStyles.initials}>{lastName[0]}</Text>
        </ImageBackground>
        <LayoutCustom pt={5} itemsCenter style={themedStyles.infoContainer}>
          <Text style={themedStyles.nameText}>{name} {lastName}</Text>
          <Text style={themedStyles.userName}>Usuario: {session.username} </Text>
          <Text style={themedStyles.account}>Cta: {session.accountId}</Text>
        </LayoutCustom>
        <View style={themedStyles.imageContainer}>
          <Image
            source={background}
            style={themedStyles.imageResize}
          />
        </View>
        <LayoutCustom ph={theme.paddings.large} style={themedStyles.buttonsContainer}>
          <LayoutCustom>
            <View style={themedStyles.inputIconWrapper}>
              <TextInput editable={editEmail} onChangeText={handleUserInfoChange('email')} value={userInfo.email} placeholder="Email" placeholderTextColor={"gray"} style={themedStyles.input} />
              {
                !editEmail ?
                  <TouchableOpacity onPress={() => setEditEmail(!editEmail)}>
                    <Icon
                      pack="eva"
                      name={'edit-2-outline'}
                      style={themedStyles.inputIcon}
                    />
                  </TouchableOpacity>
                  :
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '15%' }}>
                    <TouchableOpacity onPress={() => editUserInfo('email')}>
                      <Icon
                        pack="eva"
                        name={'checkmark-circle-outline'}
                        style={{ ...themedStyles.inputIcon }}
                      />
                    </TouchableOpacity>
                    <Icon
                      pack="eva"
                      name={'close-circle-outline'}
                      style={{ ...themedStyles.inputIcon }}
                    />
                  </View>
              }
            </View>
            <View style={themedStyles.inputIconWrapper}>
              <TextInput editable={editPhone} onChangeText={handleUserInfoChange('telefono')} value={userInfo.telefono} placeholder="Telefono" placeholderTextColor={"gray"} style={themedStyles.input} />
              {
                !editPhone ?
                  <TouchableOpacity onPress={() => setEditPhone(!editPhone)}>
                    <Icon
                      pack="eva"
                      name={'edit-2-outline'}
                      style={{ ...themedStyles.inputIcon }}
                    />
                  </TouchableOpacity>
                  :
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '15%' }}>
                    <TouchableOpacity onPress={() => editUserInfo('telefono')}>
                      <Icon
                        pack="eva"
                        name={'checkmark-circle-outline'}
                        style={{ ...themedStyles.inputIcon }}
                      />
                    </TouchableOpacity>
                    <Icon
                      pack="eva"
                      name={'close-circle-outline'}
                      style={{ ...themedStyles.inputIcon }}
                    />
                  </View>
              }
            </View>
          </LayoutCustom>
          <LayoutCustom mt={theme.margins.medium}>
            <ConfigButton onPress={toggleModal} title={"Cambiar contraseña"} icon={password} />
            <ConfigButton onPress={sendWhatsapp} title={"Enviar whatsapp"} icon={whatsapp} />
            <ConfigButton onPress={sendEmail} title={"Enviar email"} icon={mail} />
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
    // borderBottomWidth: 1,
    height: windowHeight * 0.06,
    borderColor: 'gray',
    color: '#5A5959',
    fontSize: theme.fontSizes.small,
    paddingBottom: theme.paddings.xSmall,
    fontWeight: "bold"
  },
  centeredView: {
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
    height: windowHeight * 0.4,
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
    margin: theme.margins.small,
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
    justifyContent: "center",
    flexDirection: 'row'
  },
  initials: {
    fontSize: 50,
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