
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// marin screens
import DashboardScreens from './src/screens/DashboardScreens';
import ChatScreens from './src/screens/ChatScreens';
import DespesasScreen from './src/screens/DespesasScreens';
import DicaScreens from './src/screens/DicaScreens';
import SettingScreens from './src/screens/SettingScreens';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen  from './src/screens/RegisterScreen ';
import MetasScreens  from './src/screens/MetasScreens';
import EditarMeta  from './src/screens/EditarMeta';
import FavoritoScreens  from './src/screens/FavoritoScreens';
import NotificationScreens  from './src/screens/NotificationScreens';

// add screens
import AddDespesa from './src/screens/AddDespesa';
import AddMeta from './src/screens/AddMeta';

// perfil screens
import Perfil from './src/screens/Perfil';
import Definicoes from './src/screens/Definicoes';
import EditarPerfil from './src/screens/EditarPerfil';

// componentes screens
import dica from './src/components/dica';
import metainfo from './src/components/meta';
import despesainfo from './src/components/despesa';
import premium from './src/components/premium';
import LoadingAnimation from './src/LoadingAnimation';

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
    <Tab.Screen name="Dashboard" component={DashboardScreens} />
    <Tab.Screen name="Chat" component={ChatScreens} />
    <Tab.Screen name="Dica" component={DicaScreens} />
    <Tab.Screen name="Setting" component={SettingScreens} />
  </Tab.Navigator>
);

const MyStack = () => {
  const [initialRoute, setInitialRoute] = React.useState('LoadingAnimation');

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setInitialRoute(token ? 'Home' : 'LoadingAnimation');
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="LoadingAnimation" component={LoadingAnimation} />
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Metas" component={MetasScreens}/>
        <Stack.Screen name="AddDespesa" component={AddDespesa}/>
        <Stack.Screen name="AddMeta" component={AddMeta}/>
        <Stack.Screen name="Perfil" component={Perfil}/>
        <Stack.Screen name="Definicoes" component={Definicoes}/>
        <Stack.Screen name="EditarPerfil" component={EditarPerfil}/>
        <Stack.Screen name="dica" component={dica}/>
        <Stack.Screen name="despesa" component={despesainfo}/>
        <Stack.Screen name="meta" component={metainfo}/>
        <Stack.Screen name="EditarMeta" component={EditarMeta}/>
        <Stack.Screen name="FavoritoScreens" component={FavoritoScreens}/>
        <Stack.Screen name="NotificationScreens" component={NotificationScreens}/>
        <Stack.Screen name="premium" component={premium}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
