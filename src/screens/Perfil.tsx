import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const PerfilScreen = () => {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('http://192.168.3.11:3000/perfil/user', {
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

  const handleUpdateProfile = () => {
    navigation.navigate('EditarPerfil');
  };

  const handleLogout = async () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Image  source={userData.Avatar ? { uri: userData.Avatar } : require('../assets/unknowicon.png')}
        style={styles.avatar} />
        <Text style={styles.userName}>{userData.Name}</Text>
        <Text style={styles.accountType}>
          Account Type: {userData.AccountType ? userData.AccountType : 'FREE'}
        </Text>
        <View style={styles.perfilcontainer}>
            <Text>Email: {userData.Email}</Text>
            <Text>Currency Unit: {userData.CurrencyUnit}</Text>
            <Text>User Type: {userData.UserType}</Text>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleUpdateProfile}>
          <Text>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <Text>Terminar Sessão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userDetails: {
    alignItems: 'center',
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3E198C',
  },
  accountType: {
    fontSize: 16,
    marginBottom: 20,
    color: '#3E198C',
  },
  actionButton: {
    padding: 10,
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#3E198C',
    color: '#3E198C',
    fontSize: 30,
    
  },perfilcontainer:{
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3E198C',
    fontSize: 30,
    fontWeight: 'bold',

  }
});

export default PerfilScreen;
