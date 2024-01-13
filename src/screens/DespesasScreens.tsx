import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Despesas from './DespesasScreens'; 
import Metas from './Metas'; 


const DespesasScreens = () => {
  const navigation = useNavigation();
  
  const goToDespesas = () => {
    
      navigation.navigate('Despesas'); 
    
  };

  const goToMetas = () => {
    
      navigation.navigate('Metas');
    
  };

  return (
    <View >
      <View style={styles.containerbtn}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
          onPress={goToDespesas}
        >
          <Text style={styles.buttonText}>Transações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={goToMetas}
        >
          <Text style={styles.buttonText}>Metas de Poupança</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>despesas</Text>
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
});

export default DespesasScreens;
