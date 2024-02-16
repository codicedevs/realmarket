import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Finance02 from 'screens/Finance/Finance02';
import LoginScreen from 'screens/Login';
import { FinanceStackParamList } from 'types/navigation-types';


const Stack = createNativeStackNavigator<FinanceStackParamList>();
// finance 1 pantalla con estadisticas, tiene botones que pueden ayudar a la pantalla de disponibilidad
// finance7 homebank, tarjetas de credito, opciones de enviar y recibir dinero, transacciones recientes, puede servir para pantalla disponibilidad
// finance 8  puede servir para pantalla posiciones 
const FinanceNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="FinanceIntro">
      <Stack.Screen name="FinanceIntro" component={LoginScreen} />
      {/* <Stack.Screen name="Finance01" component={Finance01} /> */}
      <Stack.Screen name="Finance02" component={Finance02} />
      {/* <Stack.Screen name="Finance03" component={Finance03} /> */}
      {/* <Stack.Screen name="Finance04" component={Finance04} /> pantalla para contabilizar ahorro para tu meta, tiene calendario  */}
      {/* <Stack.Screen name="Finance05" component={Finance05} /> pantalla para crear meta, */}
      {/* <Stack.Screen name="Finance06" component={Finance06} /> puede servir para la pantalla de posiciones, es un money manager que muestra total ganado vendido, estadisticas con transacciones */}
      {/* <Stack.Screen name="Finance07" component={Finance07} /> */}
      {/* <Stack.Screen name="Finance08" component={Finance08} />  */}
      {/* <Stack.Screen name="Finance09" component={Finance09} /> wallet con transacciones */}
      {/* <Stack.Screen name="Finance10" component={Finance10} /> transacciones con sumatoria para llevar historial */}
    </Stack.Navigator>
  );
};
export default FinanceNavigator;
