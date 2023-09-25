import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const TestDropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      <DropDownPicker
        items={[
          { label: 'Item 1', value: 'item1' },
          { label: 'Item 2', value: 'item2' },
        ]}
        defaultValue={selectedValue}
        containerStyle={{ height: 40, width: '90%' }}
        onChangeItem={item => {
          console.log("Item selecionado:", item.value);
          setSelectedValue(item.value);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});

export default TestDropdown;
