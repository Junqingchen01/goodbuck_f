import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import despesainfo from '../components/despesa';


import AsyncStorage from '@react-native-async-storage/async-storage';

const DespesasScreen = () => {
  const navigation = useNavigation();
  const [despesas, setDespesas] = useState([]);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(
          // 'http://192.168.3.11:3000/despesas' // ipconfig de casa
          'http://172.23.113.65:3000/despesas'  // ipconfig de escola
          , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.user.UserID);
          setDespesas(data.user.Despesas); // Correção aqui
          
        } else {
          console.error('Erro :', response.status);
          navigation.navigate('Login');
        }
      } else {
        console.error('AsyncStorage cant find token');
      }
    } catch (error) {
      console.error('erro:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  const goToMetas = () => {
    navigation.navigate('Metas');
  };

  const goToAddDespesa = () => {
    navigation.navigate('AddDespesa');
  };
  const handleDespesaPress = (DespesaID) => {

    navigation.navigate('despesa', { DespesaID });
  };

  return (
    <View>
      <View style={styles.containerbtn}>
        <TouchableOpacity style={[styles.button, styles.leftButton]}>
          <Text style={styles.buttonText}>Transações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={goToMetas}
        >
          <Text style={styles.buttonText}>Metas de Poupança</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ maxHeight: 400 }}
        data={despesas}
        keyExtractor={(item) => item.DespesaID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDespesaPress(item.DespesaID)}>
            <View style={styles.metaContainer}>
              <Text>{`DespesaID: ${item.DespesaID}`}</Text>
              <Text>{`Date: ${item.Date}`}</Text>
              <Text>{`Category: ${item.Category}`}</Text>
              <Text>{`Description: ${item.Description}`}</Text>
              <Text>{`PaymentMethod: ${item.PaymentMethod}`}</Text>
              <Text>{`Amount: ${item.Amount}`}</Text>
              <Text>{'------------------------'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.add}>
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={goToAddDespesa}
        >
          <Text style={styles.buttonText}>Adicionar nova despesa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerbtn: {
    flexDirection: 'row',
    marginHorizontal: -6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFF7',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFF7',
    height: 493,
    width: 431,
  },
  button: {
    width: 150,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#3E198C',
  },
  leftButton: {
    backgroundColor: '#E8CBF6',
    marginRight: -2,
  },
  rightButton: {
    backgroundColor: '#FFFFF7',
    marginLeft: -2,
  },
  buttonText: {
    color: '#3E198C',
  }, add: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },metaContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

export default DespesasScreen;