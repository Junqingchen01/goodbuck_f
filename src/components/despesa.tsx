import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DespesaProps {
  despesa: {
    id: number;
    Category: string;
    PaymentMethod: string;
    Amount: number;
  };
}

const Despesa: React.FC<DespesaProps> = ({ despesa }) => {
  return (
    <View style={styles.container}>
      <Text>ID: {despesa.id}</Text>
      <Text>Category: {despesa.Category}</Text>
      <Text>Payment Method: {despesa.PaymentMethod}</Text>
      <Text>Amount: {despesa.Amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
  },
});

export default Despesa;
