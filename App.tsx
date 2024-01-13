// app.tsx

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Dashboard from './src/screens/Dashboard';
import Chat from './src/screens/Chat';
import DespesasScreen from './src/screens/DespesasScreens';
import Dica from './src/screens/Dica';
import Setting from './src/screens/Setting';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen  from './src/screens/RegisterScreen ';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused ? require('./src/assets/dashboard_ativ.png') : require('./src/assets/dashboard_inativ.png');
        } else if (route.name === 'Chat') {
          iconName = focused ? require('./src/assets/chat_ativ.png') : require('./src/assets/chat_inativ.png');
        } else if (route.name === 'Despesas') {
          iconName = focused ? require('./src/assets/despesas_ativ.png') : require('./src/assets/despesas_inativ.png');
        } else if (route.name === 'Dica') {
          iconName = focused ? require('./src/assets/dica_ativ.png') : require('./src/assets/dica_inativ.png');
        } else if (route.name === 'Setting') {
          iconName = focused ? require('./src/assets/profil_ative.png') : require('./src/assets/profile999_inativ.png');
        }

        return <Image source={iconName} style={{ width: 24, height: 24 }} />;
      },
    })}
  >
    <Tab.Screen name="Despesas" component={DespesasScreen} />
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Chat" component={Chat} />
    <Tab.Screen name="Dica" component={Dica} />
    <Tab.Screen name="Setting" component={Setting} />
  </Tab.Navigator>
);

const MyStack = () => {
  const [initialRoute, setInitialRoute] = React.useState('Login');

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setInitialRoute(token ? 'Home' : 'Login');
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
