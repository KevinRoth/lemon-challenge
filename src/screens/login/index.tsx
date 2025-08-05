import { View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import ThemedSafeArea from '../../components/ThemedSafeArea';
import { ThemedText } from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';

export const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ThemedSafeArea className="bg-white flex-1">
      <View className="mx-sm">
        <ThemedText type="title" className="text-center my-xl">
          Welcome to Lemon Challenge
        </ThemedText>
        <ThemedButton
          onPress={() => navigation.navigate('Authenticated')}
          type="primary"
        >
          Login
        </ThemedButton>
      </View>
    </ThemedSafeArea>
  );
};
