import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DicaScreens = () => {
  const navigation = useNavigation();
  const [dicas, setDicas] = useState([]);

  const fetchAllDica = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('http://192.168.3.11/dica/dica', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDicas(data);
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
    fetchAllDica();
  }, []);

  // const goToFavorito = () => {
  //   // Navigate to Favorito screen
  //   navigation.navigate('Favorito');
  // };

  const renderDicaItem = ({ item }) => (
    <View style={styles.dicaItemContainer}>
      <Text style={styles.dicaText}>{item.Title}</Text>
      <Text style={styles.dicaText}>{item.Type}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.containerbtn}>
        <TouchableOpacity style={[styles.button, styles.leftButton]}>
          <Text style={styles.buttonText}>Dica</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rightButton]} >
          <Text style={styles.buttonText}>Favorito</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={dicas}
          renderItem={renderDicaItem}
          keyExtractor={(item) => item.id.toString()}
        />
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
    marginVertical: 20,
    backgroundColor: '#FFFFF7',
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
  dicaItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dicaText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default DicaScreens;
