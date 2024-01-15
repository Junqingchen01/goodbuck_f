import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DespesaDetail = ({ route }) => {
  const { DespesaID } = route.params;
  const [despesaDetail, setDespesaDetail] = useState(null);

  useEffect(() => {
    const fetchDespesaDetail = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://192.168.3.11:3000/despesas/${DespesaID}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDespesaDetail(data.despesa);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDespesaDetail();
  }, [DespesaID]);

  if (!despesaDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{`DespesaID: ${despesaDetail.DespesaID}`}</Text>
      <Text>{`Date: ${despesaDetail.Date}`}</Text>
      <Text>{`Category: ${despesaDetail.Category}`}</Text>
      <Text>{`Description: ${despesaDetail.Description}`}</Text>
      <Text>{`PaymentMethod: ${despesaDetail.PaymentMethod}`}</Text>
      <Text>{`Amount: ${despesaDetail.Amount}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: '#FFFFF7',
    padding: 16,
  },
});

export default DespesaDetail;
