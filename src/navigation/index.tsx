import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home';
import { LoginScreen } from '../screens/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ThemedIcon from '../components/ThemedIcon';
import { ExchangeScreen } from '../screens/exchange';
import { WalletScannerScreen } from '../screens/walletScanner';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCredentials } from '../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import { SettingsScreen } from '../screens/settings';

export type RootStackParamList = {
  Login: undefined;
  Authenticated: undefined;
};

export type TabsStackParamList = {
  Home: undefined;
  Exchange: undefined;
  WalletScanner: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsStackParamList>();

const TabIcon = ({
  name,
  focused,
  size,
}: {
  name: string;
  focused: boolean;
  size: number;
}) => (
  <ThemedIcon name={name} size={size} color={focused ? '#a259e6' : 'gray'} />
);

export const TabsStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#a259e6',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon name="home" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Exchange"
        component={ExchangeScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#a259e6',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon name="money" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="WalletScanner"
        component={WalletScannerScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#a259e6',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon name="qrcode" focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#a259e6',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon name="cog" focused={focused} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const RootStack = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        dispatch(setCredentials({ token: storedToken, user: null }));
        navigation.navigate('Authenticated');
      }
    };
    loadSession();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Authenticated"
        component={TabsStack}
      />
    </Stack.Navigator>
  );
};
