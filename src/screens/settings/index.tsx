import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/authSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ThemedSafeArea from '../../components/ThemedSafeArea';
import { ThemedText } from '../../components/ThemedText';
import ThemedIcon from '../../components/ThemedIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

export const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (e) {
      // ignore error
    }
    dispatch(logOut());
    navigation.navigate('Login');
  };

  return (
    <ThemedSafeArea className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center bg-red-100 px-lg py-sm rounded"
        >
          <ThemedIcon name="sign-out" size={20} color="#EA4335" />
          <ThemedText type="body-1" className="ml-xs text-red-500">
            Cerrar sesión
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedSafeArea>
  );
};
