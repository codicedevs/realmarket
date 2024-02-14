import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CurrencyToggle = ({ changeCurrency }: { changeCurrency: React.Dispatch<React.SetStateAction<string>> }) => {
  const [currency, setCurrency] = useState('ARS');

  const toggleCurrency = () => {
    const newCurrency = currency === 'ARS' ? 'USD' : 'ARS'
    setCurrency(newCurrency);
    changeCurrency(newCurrency)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currency === 'ARS' && styles.buttonActive]}
        onPress={toggleCurrency}
      >
        <Text style={[styles.text, currency === 'ARS' && styles.textActive]}>AR$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, currency === 'USD' && styles.buttonActive]}
        onPress={toggleCurrency}
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
    width: '40%'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '50%'
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