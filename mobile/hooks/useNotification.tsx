import Toast from 'react-native-root-toast';

const useNotification = () => {

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

  return { notification }

}

export default useNotification