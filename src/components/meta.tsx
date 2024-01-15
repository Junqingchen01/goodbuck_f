
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MetaDetail = ({ route, navigation }) => {
  const { MetaID } = route.params;
  const [metaDetail, setMetaDetail] = useState(null);

  useEffect(() => {
    const fetchMetaDetail = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://192.168.3.11:3000/metas/${MetaID}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setMetaDetail(data);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error fetching meta detail:', error);
      }
    };
    
    

    fetchMetaDetail();
  }, [MetaID]);

  const handleUpdateMeta = () => {
    navigation.navigate('EditarMeta', { MetaID });
  };

  const handleDeleteMeta = async () => {
    try {
      Alert.alert(
        'delect',
        'Tens certeza queres deletar?',
        [
          {
            text: 'cancelar',
            style: 'cancel',
          },
          {
            text: 'dalect',
            onPress: async () => {
              const token = await AsyncStorage.getItem('token');
              const response = await fetch(`http://192.168.3.11:3000/metas/${MetaID}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              });
  
              if (response.ok) {
                navigation.goBack();
              } else {
                console.error('Error:', response.status);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!metaDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>MetaID: {metaDetail.MetaID}</Text>
      <Text>Name: {metaDetail.Name}</Text>
      <Text>Description: {metaDetail.Description}</Text>
      <Text>Planned Contribution: {metaDetail.PlannedContribution}</Text>
      <Text>Current Contribution: {metaDetail.CurrentContribution}</Text>
      <Text>Start Date: {metaDetail.StartDate}</Text>
      <Text>End Date: {metaDetail.EndDate}</Text>
      <Text>Priority: {metaDetail.Priority}</Text>

    
        <TouchableOpacity style={styles.button} onPress={handleUpdateMeta}>
          <Text style={styles.buttonText}>Update Meta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeleteMeta}>
          <Text style={styles.buttonText}>Delete Meta</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  button: {
    marginTop: 20,
    backgroundColor: '#3E198C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default MetaDetail;
