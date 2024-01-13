import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Meta from '../components/meta';

const MetasScreens = () => {
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://192.168.3.11:3000/metas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMetas(data);
        } else {
          console.error('Error fetching metas:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, []);
  const navigation = useNavigation();
  const goToDespesas = () => {
    navigation.navigate('Despesas');
  };

  const goToAddDMeta = () => {
    navigation.navigate('AddMeta');
  };

  return (
    <View >
      <View style={styles.containerbtn}>
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={goToDespesas}
        >
          <Text style={styles.buttonText}>Transações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
        >
          <Text style={styles.buttonText}>Metas de Poupança</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
      <FlatList
        data={metas}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <Meta meta={item} />}
      />
    </View>
      <View style={styles.add}>
      <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={goToAddDMeta}
        >
          <Text style={styles.buttonText}>Adicionar nova meta</Text>
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
    backgroundColor:'#FFFFF7',
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
  },
  add:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }, container: {
    flex: 1,
    padding: 16,
  },
});

export default MetasScreens;
