import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreens = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(
          'https://backend-54nz.onrender.com/notifications', // ipconfig de escola
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
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
    fetchNotifications();
  }, []);

  const handleNotificationPress = (notificationId) => {
    navigation.navigate('notification', { notificationId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ maxHeight: 400 }}
        data={notifications}
        keyExtractor={(item) => (item && item.notificationId ? item.notificationId.toString() : null)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item?.notificationId)}>
            <View style={styles.notificationContainer}>
              <Text>{`Date: ${item.Title || ''}`}</Text>
              <Text>{`Message: ${item.Content || ''}`}</Text>
              <Text>{`Date: ${item.Date || ''}`}</Text>
              <Text>{'------------------------'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF7',
    height: 493,
    width: 431,
  },
  notificationContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

export default NotificationScreens;
