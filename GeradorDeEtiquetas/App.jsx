/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedFood, setSelectedFood] = useState('');

  return (
    <View style={styles.container}>
      <Text>Etiqueta: Validade de Alimentos</Text>
      
      <Text>Condição de Armazenamento:</Text>
      <Picker
        selectedValue={selectedCondition}
        onValueChange={(itemValue) => setSelectedCondition(itemValue)}
      >
        <Picker.Item label="Refrigerado" value="Refrigerado" />
        <Picker.Item label="Congelado -10°C a -18°C" value="Congelado -10°C a -18°C" />
        <Picker.Item label="Congelado Temperatura menor que -18°C" value="Congelado Temperatura menor que -18°C" />
        <Picker.Item label="Seco (Após Abertura da Embalagem)" value="Seco (Após Abertura da Embalagem)" />
      </Picker>

      <Text>Alimento:</Text>
      <Picker
        selectedValue={selectedFood}
        onValueChange={(itemValue) => setSelectedFood(itemValue)}
      >
        {/* As opções serão preenchidas dinamicamente mais tarde */}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0db',
  },
});

export default App;