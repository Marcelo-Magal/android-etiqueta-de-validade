import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const alimentosPorCondicao = {
  'Refrigerado': [
    'Pescados e seus produtos manipulados crus',
    'Carnes (bovina, suína, aves, etc.)',
    'Sobremesas, frios e laticínios manipulados',
    'Salsichas e conservados',
    'Folhosos e frutas sensíveis',
    'Outras frutas e legumes',
    'Alimentos pós-cocção',
    'Pescados pós-cocção',
    'Ovos',
    'Manteiga',
    'Creme de leite fresco',
    'Queijos duros',
    'Queijos frescos ou macios',
    'Maionese e misturas de maionese com outros alimentos'
  ],
  'Congelado -10°C a -18°C': [
    'Todos os alimentos'
  ],
  'Congelado Temperatura menor que -18°C': [
    'Todos os alimentos'
  ],
  'Seco (Após Abertura da Embalagem)': [
    'Alimentos enlatados',
    'Carnes e frios enlatados',
    'Farinhas',
    'Sucos enlatados e engarrafados',
    'Temperos em pó',
    'Sal',
    'Açúcar',
    'Fermento químico em pó',
    'Bicarbonato de sódio'
  ]
};

// Função auxiliar para formatar a data no formato desejado
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam de 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const App = () => {
  const [selectedCondition, setSelectedCondition] = useState('Refrigerado');
  const [selectedFood, setSelectedFood] = useState('');
  const [manufactureDate, setManufactureDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const calcularValidade = () => {
    let tempoMaximoArmazenamento = 0;

    if (selectedCondition === 'Refrigerado') {
      switch (selectedFood) {
        case 'Pescados e seus produtos manipulados crus':
          tempoMaximoArmazenamento = 1;
          break;
        case 'Carnes (bovina, suína, aves, etc.)':
          tempoMaximoArmazenamento = 3;
          break;
        case 'Sobremesas, frios e laticínios manipulados':
          tempoMaximoArmazenamento = 1;
          break;
        case 'Salsichas e conservados':
          tempoMaximoArmazenamento = 7;
          break;
        case 'Folhosos e frutas sensíveis':
          tempoMaximoArmazenamento = 3;
          break;
        case 'Outras frutas e legumes':
          tempoMaximoArmazenamento = 7;
          break;
        case 'Alimentos pós-cocção':
          tempoMaximoArmazenamento = 3;
          break;
        case 'Pescados pós-cocção':
          tempoMaximoArmazenamento = 1;
          break;
        case 'Ovos':
          tempoMaximoArmazenamento = 14;
          break;
        case 'Manteiga':
          tempoMaximoArmazenamento = 14;
          break;
        case 'Creme de leite fresco':
          tempoMaximoArmazenamento = 3;
          break;
        case 'Queijos duros':
          tempoMaximoArmazenamento = 21;
          break;
        case 'Queijos frescos ou macios':
          tempoMaximoArmazenamento = 7;
          break;
        case 'Maionese e misturas de maionese com outros alimentos':
          tempoMaximoArmazenamento = 1;
          break;
        default:
          tempoMaximoArmazenamento = 0;
      }
    } else if (selectedCondition === 'Congelado -10°C a -18°C') {
      tempoMaximoArmazenamento = 30;
    } else if (selectedCondition === 'Congelado Temperatura menor que -18°C') {
      tempoMaximoArmazenamento = 90;
    } else if (selectedCondition === 'Seco (Após Abertura da Embalagem)') {
      switch (selectedFood) {
        case 'Alimentos enlatados':
          tempoMaximoArmazenamento = 3;
          break;
        case 'Carnes e frios enlatados':
          tempoMaximoArmazenamento = 3;
          break;
        case 'Farinhas':
          tempoMaximoArmazenamento = 30;
          break;
        case 'Sucos enlatados e engarrafados':
          tempoMaximoArmazenamento = 3;
          break;
        case 'Temperos em pó':
          tempoMaximoArmazenamento = 30;
          break;
        case 'Sal':
          tempoMaximoArmazenamento = 30;
          break;
        case 'Açúcar':
          tempoMaximoArmazenamento = 30;
          break;
        case 'Fermento químico em pó':
          tempoMaximoArmazenamento = 30;
          break;
        case 'Bicarbonato de sódio':
          tempoMaximoArmazenamento = 30;
          break;
        default:
          tempoMaximoArmazenamento = 0;
      }
    }

    console.log("Tempo Máximo de Armazenamento:", tempoMaximoArmazenamento); // Log para verificar o tempo de armazenamento
    console.log("Data de Fabricação:", manufactureDate); // Log para verificar a data de fabricação

    if (tempoMaximoArmazenamento === 0) {
      Alert.alert('Erro', 'Regras de validade não definidas para o alimento e condição selecionados.');
    } else {
      const newExpiryDate = new Date(manufactureDate);
      newExpiryDate.setDate(manufactureDate.getDate() + tempoMaximoArmazenamento);
      console.log("Nova Data de Validade Definida:", newExpiryDate);
      return newExpiryDate; // Adicionada a linha para retornar a nova data de validade
    }
  };

  const handleCalculate = () => {
    const calculatedExpiryDate = calcularValidade(); // Use o valor retornado
    console.log("Data de Fabricação Antes do Alerta:", formatDate(manufactureDate));
    console.log("Data de Validade Antes do Alerta:", formatDate(calculatedExpiryDate));
    if (calculatedExpiryDate) {
      Alert.alert(
        "", // Removido "Etiqueta"
        `Condição: ${selectedCondition}\n` +
        `Produto: ${selectedFood}\n` + 
        `Fabricação: ${formatDate(manufactureDate)}\n` + // Usando a função formatDate
        `Validade: ${formatDate(calculatedExpiryDate)}`  // Usando a função formatDate
      );
    } else {
      Alert.alert('Erro', 'Regras de validade não definidas para o produto e condição selecionados.');
    }
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
        {['Selecione um alimento', ...alimentosPorCondicao[selectedCondition]].map((alimento) => (
          <Picker.Item key={alimento} label={alimento} value={alimento} />
        ))}
      </Picker>

      <Text>Data de Fabricação:</Text>
      <Button title={manufactureDate.toDateString()} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={manufactureDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setManufactureDate(selectedDate);
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

