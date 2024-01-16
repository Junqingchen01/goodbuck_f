// Settings.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(
          // 'http://192.168.3.11:3000/perfil/user'   ip de casa
          'http://172.23.113.65:3000/perfil/user'  // ip de escola
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

  // const goToNotifications = () => {
  //   navigation.navigate('Notifications');
  // };

  const goToPerfil = () => {
    navigation.navigate('Perfil');
  };

  const goToDefinicoes = () => {
    navigation.navigate('Definicoes');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.notificationIcon}>
        <Image source={require('../assets/bell7.png')} />
      </TouchableOpacity>
      <View style={styles.userDetails}>
      <Image
          source={userData.Avatar ? { uri: userData.Avatar } : require('../assets/unknowicon.png')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userData.Name}</Text>
        <Text style={styles.accountType}>
          Account Type: {userData.AccountType ? userData.AccountType : 'FREE'}
        </Text>
        <TouchableOpacity style={styles.settingsOption} onPress={goToPerfil}>
          <Text>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsOption} onPress={goToDefinicoes}>
          <Text>Definicoes</Text>
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
  notificationIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
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
  settingsOption: {
    width: 150,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#3E198C',
  },
});

export default SettingsScreen;
