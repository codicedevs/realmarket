import Toast from "react-native-root-toast";


export const notification = (texto: string) => {
  Toast.show(texto, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}