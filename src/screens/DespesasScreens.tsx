import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import despesainfo from '../components/despesa';


import AsyncStorage from '@react-native-async-storage/async-storage';

const DespesasScreen = () => {
  const navigation = useNavigation();
  const [despesas, setDespesas] = useState([]);
  const [userData, setUserData] = useState({});


  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(
          'https://backend-54nz.onrender.com/despesas' , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

          },
        });
        if (response.ok) {
          const data = await response.json();
          setDespesas(data.user.Despesas); 
          
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
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(
          'https://backend-54nz.onrender.com/perfil/user'

          , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.error('Error:', response.status);
        }
      } else {
        console.error('AsyncStorage cant find token');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserData();
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

  const handleRefresh = () => {
    fetchData();
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
        style={styles.flatList}
        data={despesas}
        keyExtractor={(item) => item.DespesaID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDespesaPress(item.DespesaID)}>
            <View style={styles.metaContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{`${item.Description}`}</Text>
                  <Text style={styles.category} >{` ${item.Category}`}</Text>
                  <Text style={{marginLeft :10,}}>{`Date: ${item.Date}`}</Text>
                </View>
                <View style={{ marginTop:15,}}>
                  <Text style={styles.amount}>{`Amount: ${item.Amount}  ${userData.CurrencyUnit}`}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.add}>
        <TouchableOpacity
          style={[styles.button, styles.addbtn]}
          onPress={goToAddDespesa}
        >
          <Text style={styles.buttonText}>Adicionar nova despesa</Text>
        </TouchableOpacity>
        <TouchableOpacity
                  style={[styles.button, styles.reflashbtn, ]}
                  onPress={handleRefresh}
                >
                  <Text style={styles.buttonText}>Refresh</Text>
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
  },
  metaContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    color: 'white',
    backgroundColor: '#E8CBF6',
    
  },amount:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3E198C',
    padding: 5,
    width: 210,
    textAlign: 'center',
    margin: 0,
    backgroundColor: '#E8CBF6',

  },category:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    borderRadius: 50,
    borderWidth: 2,
    width: 80,
    textAlign: 'center',
    backgroundColor: '#3E198C',
    borderColor: '#3E198C',
  },title:{
    fontSize: 30,
    color: 'black',
    marginLeft: 10,
  },flatList:{
    maxHeight: 400,
    backgroundColor: '#FFFFF7',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },addbtn:{
    width: 200,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#3E198C',
  },reflashbtn:{
    width: 100,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#3E198C',
    marginTop: 10,
  }
});

export default DespesasScreen;