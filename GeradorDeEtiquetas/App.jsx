/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const foodValidity = {
    Refrigerado: {
      'Carne Bovina': 3,
      'Peixe Fresco': 1,
      'Frango': 2,
    },
    'Congelado -10°C a -18°C': {
      'Carne Bovina': 120,
      'Peixe Fresco': 60,
      'Frango': 90,
    },
    'Congelado Temperatura menor que -18°C': {
      'Carne Bovina': 365,
      'Peixe Fresco': 180,
      'Frango': 270,
    },
    'Seco (Após Abertura da Embalagem)': {
      'Arroz': 180,
      'Feijão': 180,
      'Macarrão': 180,
    },
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
        <Picker.Item label="Selecione uma condição" value={null} />
        {Object.keys(foodValidity).map((condition) => (
          <Picker.Item key={condition} label={condition} value={condition} />
        ))}
      </Picker>

      <Text>Alimento:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedFood}
        onValueChange={(itemValue) => setSelectedFood(itemValue)}
      >
        <Picker.Item label="Selecione um alimento" value={null} />
        {selectedCondition && Object.keys(foodValidity[selectedCondition]).map((food) => (
          <Picker.Item key={food} label={food} value={food} />
        ))}
      </Picker>

      <Text>Data Inicial:</Text>
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

      <Button title="Imprimir Etiqueta" onPress={() => {
        if (!selectedCondition || !selectedFood) {
          alert('Por favor, selecione a condição de armazenamento e o alimento.');
          return;
        }

        const validityDays = foodValidity[selectedCondition][selectedFood];
        const expiryDate = new Date(date);
        expiryDate.setDate(expiryDate.getDate() + validityDays);

        alert(`A validade do ${selectedFood} é até ${expiryDate.toDateString()}`);
      }} />
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
    height: 50,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default App;
