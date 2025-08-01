import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ThemedSafeArea from '../../components/ThemedSafeArea';
import { ThemedText } from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ThemedSafeArea className="bg-white flex-1">
      <View className="mx-sm">
        <ThemedText type="title" className="text-center my-xl">
          Home Screen
        </ThemedText>
        <ThemedButton onPress={() => navigation.goBack()} type="primary">
          Login
        </ThemedButton>
      </View>
    </ThemedSafeArea>
  );
};
