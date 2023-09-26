import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Etiqueta = ({ condicao, produto, fabricacao, validade }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.text}><Text style={styles.label}>Condição:</Text> <Text style={styles.customFont}>{condicao}</Text></Text>
        <Text style={styles.text}><Text style={styles.label}>Produto:</Text> <Text style={styles.customFont}>{produto}</Text></Text>
        <Text style={styles.text}><Text style={styles.label}>Fabricação:</Text> <Text style={styles.customFont}>{fabricacao}</Text></Text>
        <Text style={styles.text}><Text style={styles.label}>Validade:</Text> <Text style={styles.customFont}>{validade}</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    
    fontWeight: 'bold', // Se a fonte já for em negrito, você pode omitir esta linha
    fontSize: 18, // Ajuste o tamanho da fonte conforme necessário
    // ... outros estilos
  },

  outerContainer: {
    borderWidth: 2.5,
    borderColor: 'red',
    marginTop: 20,
    alignItems: 'flex-start',
    width: Dimensions.get('window').width * 0.9 - 8,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  container: {
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'left',
    paddingLeft: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    color: 'red',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  customFont: {
    fontFamily: 'Caveat-Regular',
    fontSize: 29,
    color: 'blue',
  },
});

export default Etiqueta;