/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { VictoryPie } from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreens = () => {
  const [categoryTotals, setCategoryTotals] = useState([]);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(
          // 'http://192.168.1.7:3000/dashboard/amount'
          'http://172.23.113.65:3000/dashboard/amount'
          
          , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const coloredCategories = data.categoryTotals.map((category, index) => ({
            ...category,
            color: ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF'][index],
          }));
          setCategoryTotals(coloredCategories);
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
  }, []);

  const calculateTotalAmount = () => {
    return categoryTotals.reduce((total, category) => total + parseFloat(category.TotalAmountByCategory), 0);
  };

  const calculatePercentage = (amount) => {
    return (amount / calculateTotalAmount()) * 100;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <VictoryPie
          data={categoryTotals.map(category => ({
            x: `${category.Category}\n$${category.TotalAmountByCategory}`,
            y: parseFloat(category.TotalAmountByCategory),
            color: category.color,
          }))}
          colorScale={categoryTotals.map(category => category.color)}
          innerRadius={70}
          labels={({ datum }) => `${datum.x}\n(${calculatePercentage(datum.y).toFixed(2)}%)`}
        />
        <Text style={styles.totalAmount}>Total: ${calculateTotalAmount().toFixed(2)}</Text>
        <View style={styles.labelContainer}>
          {categoryTotals.map((category, index) => (
            <View key={index} style={styles.labelBoxContainer}>
              <View style={[styles.labelBox, { backgroundColor: category.color }]}>
                <Text style={styles.labelText}>{`${calculatePercentage(parseFloat(category.TotalAmountByCategory)).toFixed(2)}%`}</Text>
              </View>
              <View style={[styles.labelBox, styles.largeLabelBox, { backgroundColor: category.color }]}>
                <Text style={styles.labelText}>{`${category.Category}\n$${category.TotalAmountByCategory}`}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalAmount: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    top: '37%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  labelContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  labelBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Largura total
    marginBottom: 10, // Espaçamento entre as linhas
  },
  labelBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: '30%', // Largura da caixa da porcentagem
    margin: 5, // Espaçamento entre as caixas
  },
  largeLabelBox: {
    width: '65%', // Largura da caixa da categoria e montante
  },
  labelText: {
    fontSize: 12,
    marginTop: 5,
    color: 'white',
  },
});

export default DashboardScreens;