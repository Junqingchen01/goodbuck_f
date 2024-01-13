import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type DespesaProps = {
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
        <Text>{despesa.id}</Text>
        <Text>{despesa.Category}</Text>
        <Text>{despesa.PaymentMethod}</Text>
        <Text>{despesa.Amount}</Text>
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
