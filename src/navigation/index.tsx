import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home';
import { LoginScreen } from '../screens/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ThemedIcon from '../components/ThemedIcon';

// Define param lists for navigation
export type RootStackParamList = {
  Login: undefined;
  Authenticated: undefined;
};

export type TabsStackParamList = {
  Home: undefined;
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
    </Tab.Navigator>
  );
};

export const RootStack = () => {
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
