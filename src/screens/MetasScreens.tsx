
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MetasScreen = () => {
  const navigation = useNavigation();
  const [metas, setMetas] = useState([]);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('http://192.168.3.11:3000/metas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMetas(data.metas);
        } else {
          console.error('Error fetching metas:', response.status);
        }
      } else {
        console.error('AsyncStorage cant find token');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToDespesas = () => {
    navigation.navigate('Despesas');
  };

  const goToAddMeta = () => {
    navigation.navigate('AddMeta');
  };

  const handleMetaPress = (MetaID) => {
    navigation.navigate('meta', { MetaID });
  };
  
  return (
    <View>
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
      <FlatList
        style={{ maxHeight: 400 }}
        data={metas}
        keyExtractor={(item) => item.MetaID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMetaPress(item.MetaID)}>
          <View key={item.MetaID} style={styles.metaContainer}>
            <Text>{`MetaID: ${item.MetaID}`}</Text>
            <Text>{`Name: ${item.Name}`}</Text>
            <Text>{`Description: ${item.Description}`}</Text>
            <Text>{`Planned Contribution: ${item.PlannedContribution}`}</Text>
            <Text>{`Current Contribution: ${item.CurrentContribution}`}</Text>
            <Text>{`Start Date: ${item.StartDate}`}</Text>
            <Text>{`End Date: ${item.EndDate}`}</Text>
            <Text>{`Priority: ${item.Priority}`}</Text>
            <Text>{'------------------------'}</Text>
          </View>
          </TouchableOpacity>

        )}
/>
      <View style={styles.add}>
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={goToAddMeta}
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
  },
  add: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }, metaContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

export default MetasScreen;
