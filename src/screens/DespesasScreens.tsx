import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Despesa from '../components/despesa';

const DespesasScreen = () => {
  const navigation = useNavigation();
  const [despesas, setDespesas] = useState([]);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('http://192.168.3.11:3000/despesas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDespesas(data);
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
      <View style={styles.container}>
        <Text>despesas</Text>
        <FlatList
          data={despesas}
          renderItem={({ item }) => <Despesa despesa={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
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
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },add:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});

export default DespesasScreen;
