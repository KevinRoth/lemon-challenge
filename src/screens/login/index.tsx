import React, { useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import ThemedSafeArea from '../../components/ThemedSafeArea';
import { ThemedText } from '../../components/ThemedText';
import ThemedIcon from '../../components/ThemedIcon';
import type { RootStackParamList } from '../../navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';

export const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      console.log('data,', data);
      setLoading(false);

      if (data.data) {
        dispatch(
          setCredentials({ token: data.data.idToken, user: data.data.user }),
        );

        navigation.navigate('Authenticated');
      }
    } catch (err: any) {
      setLoading(false);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('El inicio de sesión fue cancelado.');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        setError('El inicio de sesión ya está en progreso.');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Google Play Services no está disponible.');
      } else {
        setError('Ocurrió un error inesperado. Intenta nuevamente.');
      }
    }
  };

  return (
    <ThemedSafeArea className="bg-white flex-1">
      <View className="mx-sm flex-1 justify-center">
        <ThemedText type="title" className="text-center my-xl">
          Bienvenido a Lemon Challenge
        </ThemedText>
        <ThemedText
          type="body-1"
          className="text-center mb-lg text-secondary-400"
        >
          Inicia sesión para continuar
        </ThemedText>
        {error && (
          <ThemedText type="body-2" className="text-center text-red-500 mb-md">
            {error}
          </ThemedText>
        )}
        {loading ? (
          <ActivityIndicator size="large" color="#a259e6" className="my-lg" />
        ) : (
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="flex-row items-center justify-center bg-white border border-gray-200 rounded-lg py-sm px-md"
            activeOpacity={0.8}
          >
            <ThemedIcon name="google" size={20} color="#EA4335" />
            <ThemedText type="body-1" className="ml-xs text-red">
              Iniciar sesión con Google
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedSafeArea>
  );
};
