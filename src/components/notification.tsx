import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationDetail = ({ route }) => {
  const { notificationId } = route.params;
  const [notificationDetail, setNotificationDetail] = useState(null);

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`https://backend-54nz.onrender.com/notifications/${notificationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotificationDetail(data.notification);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNotificationDetail();
  }, [notificationId]);

  if (!notificationDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{`Title: ${notificationDetail.Title}`}</Text>
      <Text>{`Content: ${notificationDetail.Content}`}</Text>
      <Text>{`Date: ${notificationDetail.Date}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: '#FFFFF7',
    padding: 16,
  },
});

export default NotificationDetail;
