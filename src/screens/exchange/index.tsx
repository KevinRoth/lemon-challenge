import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import ThemedSafeArea from '../../components/ThemedSafeArea';
import { ExchangeConverter } from '../../features/ExchangeConverter';

export const ExchangeScreen = () => {
  return (
    <ThemedSafeArea className="flex-1 bg-white">
      <View className="flex-1 mx-sm mt-xl">
        <ThemedText type="title" className="text-center mb-lg">
          Exchange
        </ThemedText>
        <ExchangeConverter />
      </View>
    </ThemedSafeArea>
  );
};
