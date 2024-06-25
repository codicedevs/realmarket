import React, { useCallback, useEffect, useRef, useState } from 'react';
// import Text from '../../../components/Text'
import { Icon, StyleService } from '@ui-kitten/components';
import * as Linking from 'expo-linking';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, Image, ImageBackground, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as yup from "yup";
import ConfigButton from '../../../components/Buttons/ConfigButton';
import Container from '../../../components/Container';
import Header from '../../../components/CustomHeader';
import LayoutCustom from '../../../components/LayoutCustom';
import { useSession } from '../../../context/AuthProvider';
import { useLoading } from '../../../context/LoadingProvider';
import useNotification from '../../../hooks/useNotification';
import userService from '../../../service/user.service';
import theme from '../../../utils/theme';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError?.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )

const validationSchema = yup.object({
  oldPass: yup.string().required("Requerido").min(8, 'El usuario debe tener al menos 8 caracteres'),
  pass: yup.string().required("Requerido").min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

const ConfigScreen = () => {
  const resolver = useYupValidationResolver(validationSchema)
  const iniciales = require('../../../assets/background/portaIniciales.png')
  const background = require('../../../assets/background/separador.png')
  const password = require('../../../assets/Icons/changePassword.png')
  const logOut = require('../../../assets/Icons/logOutIcon.png')
  const mail = require('../../../assets/Icons/mailIcon.png')
  const whatsapp = require('../../../assets/Icons/whatsappIcon.png')
  const backgroundModal = require('../../../assets/background/backgroundIlustration.png')
  const [open, setOpen] = useState(false)
  const { signOut, session, checkSession } = useSession()
  const name = session.nombre.split(' ')[0]
  const lastName = session.nombre.split(' ')[1]
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver })

  const [changePasswordInfo, setChangePasswordInfo] = useState({
    newPass: '',
    currentPass: ''
  })
  const [userInfo, setUserInfo] = useState({
    email: session.email,
    telefono: session.telefono
  })
  const [editInfo, setEditInfo] = useState({
    email: false,
    telefono: false
  })
  const { notification } = useNotification()
  const { setLoadingScreen } = useLoading()

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const soloNumerosRegex = /^\d*$/;
    if (field === "telefono") {
      const isOnlyNumbers = soloNumerosRegex.test(userInfo[field])
      if (!isOnlyNumbers) {
        notification("Solo puede contener numeros")
        return
      }
      if (userInfo[field].length !== 10) {
        notification("El telefono debe tener 10 caracteres")
        return
      }
    } else {
      const isValid = emailRegex.test(userInfo[field])
      if (!isValid) {
        notification("Debe ser un email valido")
        return
      }
    }
    setLoadingScreen(true)
    try {
      await userService.editUser({
        id: session._id,
        body: { [field]: userInfo[field] }
      })
      checkSession()
      toggleEdition(field)
    }
    catch (e) {
      console.error(e)
    } finally {
      setLoadingScreen(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      await userService.ChangePassword(data)
      notification('Contraseña cambiada con exito')
    } catch (e) {
      console.error(e)
      notification('Hubo un problema')
    } finally {
      toggleModal()
    }
  };

  const onCancelEdit = (field: keyof IUser) => {
    setUserInfo({
      ...userInfo,
      [field]: session[field]
    })

    toggleEdition(field)
  }

  const toggleEdition = (field: keyof IUser) => {
    setEditInfo(prevEditInfo => {
      const newEditInfo = {
        ...prevEditInfo,
        [field]: !prevEditInfo[field]
      };

      return newEditInfo;
    });
  };

  useEffect(() => {
    if (editInfo.email && emailInputRef.current) {
      emailInputRef.current.focus();
    } else if (editInfo.telefono && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [editInfo.email, editInfo.telefono]);

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
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name='currentPass'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput value={value} onChangeText={onChange} placeholder='Contraseña actual' style={themedStyles.modalInput} />
                    )}
                  />
                  <Icon
                    pack="eva"
                    name={'eye'}
                    style={themedStyles.inputIcon}
                  />
                </View>
                <View style={{ minHeight: 30, justifyContent: "center" }}>
                  {errors.oldPass && <Text style={themedStyles.errorText}>{errors.pass?.message as string} </Text>}
                </View>
                <View style={themedStyles.inputIconWrapper}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name='newPass'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput value={value} onChangeText={onChange} placeholder='Nueva contraseña' style={themedStyles.modalInput} />
                    )}
                  />
                  <Icon
                    pack="eva"
                    name={'eye'}
                    style={themedStyles.inputIcon}
                  />
                </View>
                <View style={{ minHeight: 30, justifyContent: "center" }}>
                  {errors.pass && <Text style={themedStyles.errorText}>{errors.pass?.message as string} </Text>}
                </View>
              </View>
            </LayoutCustom>
            <LayoutCustom>
              <Pressable
                style={[themedStyles.button, themedStyles.buttonConfirm]}
                onPress={handleSubmit(onSubmit)}
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
              <TextInput
                ref={emailInputRef}
                editable={editInfo.email}
                onChangeText={handleUserInfoChange('email')}
                value={userInfo.email}
                placeholder="Email"
                placeholderTextColor={"gray"}
                style={themedStyles.input}
              />
              {
                !editInfo.email ?
                  <TouchableOpacity onPress={() => toggleEdition('email')}>
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
                    <TouchableOpacity onPress={() => onCancelEdit('email')}>
                      <Icon
                        pack="eva"
                        name={'close-circle-outline'}
                        style={{ ...themedStyles.inputIcon }}
                      />
                    </TouchableOpacity>
                  </View>
              }
            </View>
            <View style={themedStyles.inputIconWrapper}>
              <TextInput
                ref={phoneInputRef}
                editable={editInfo.telefono}
                onChangeText={handleUserInfoChange('telefono')}
                value={userInfo.telefono}
                placeholder="Telefono"
                placeholderTextColor={"gray"}
                style={themedStyles.input}
              />
              {
                !editInfo.telefono ?
                  <TouchableOpacity onPress={() => toggleEdition('telefono')}>
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
                    <TouchableOpacity onPress={() => onCancelEdit('telefono')}>
                      <Icon
                        pack="eva"
                        name={'close-circle-outline'}
                        style={{ ...themedStyles.inputIcon }}
                      />
                    </TouchableOpacity>
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
    height: windowHeight * 0.06,
    borderColor: 'gray',
    color: '#5A5959',
    fontSize: theme.fontSizes.small,
    paddingBottom: theme.paddings.xSmall,
    fontFamily: 'Lato-Bold',
    width: windowWidth * 0.7
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
    flex: 1,
    fontFamily: 'Lato-Regular'
  },
  modalView: {
    height: windowHeight * 0.45,
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
    fontSize: theme.fontSizes.caption,
    fontFamily: 'Lato-Regular'
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
    textAlign: 'center',
    fontFamily: 'Lato-Bold'
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
    color: 'white',
    fontFamily: 'Lato-Regular'
  },
  infoContainer: {
    height: windowHeight * 0.12,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 21,
    color: '#D0682E',
    fontFamily: 'Lato-Regular'
  },
  userName: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Lato-Regular'
  },
  account: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Lato-Regular'
  },
  imageResize: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
  buttonsContainer: {
    backgroundColor: "#FAFCFC",
    height: '100%'
  },
  errorText: {
    color: 'red',
    fontFamily: 'Lato-Regular'
  }
});