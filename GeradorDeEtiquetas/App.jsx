/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCalculate = () => {
    Alert.alert(
      "Etiqueta",
      `Condição: ${selectedCondition}\nAlimento: ${selectedFood}\nData: ${date.toDateString()}`
    );
  };

  return (
    <View style={styles.container}>
      <Text>Gerador de Etiquetas: Validade de Alimentos</Text>

      <Text>Condição de Armazenamento:</Text>
      <Picker
        style={styles.picker}
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
        style={styles.picker}
        selectedValue={selectedFood}
        onValueChange={(itemValue) => setSelectedFood(itemValue)}
      >
        <Picker.Item label="Selecione um alimento" value="" />
        <Picker.Item label="Carne" value="Carne" />
        <Picker.Item label="Peixe" value="Peixe" />
        <Picker.Item label="Frango" value="Frango" />
        {/* Adicione mais alimentos conforme necessário */}
      </Picker>

      <Text>Data de Fabricação:</Text>
      <Button title={date.toDateString()} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Button title="Imprimir Etiqueta" onPress={handleCalculate} />
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
  picker: {
    width: 300,
    height: 50,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
  },
});

export default App;

