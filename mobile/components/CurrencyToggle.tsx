import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useCurrency from '../hooks/useCurrency';
const windowWidth = Dimensions.get("window").width;

const CurrencyToggle = ({ onChange }: { onChange?: () => void }) => {
  const [currency, toggleCurrency] = useCurrency({ onChange: onChange })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currency === 'ARS' && styles.buttonActive]}
        onPress={() => toggleCurrency()}
      >
        <Text style={[styles.text, currency === 'ARS' && styles.textActive]}>AR$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, currency === 'USD' && styles.buttonActive]}
        onPress={() => toggleCurrency()}
      >
        <Text style={[styles.text, currency === 'USD' && styles.textActive]}>US$</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1C235D',
    borderRadius: 20,
    width: windowWidth * 0.4
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '50%',
  },
  buttonActive: {
    backgroundColor: '#009F9F'
  },
  text: {
    color: '#989696',
    fontWeight: 'bold',
  },
  textActive: {
    color: '#ffffff',
  },
});

export default CurrencyToggle;