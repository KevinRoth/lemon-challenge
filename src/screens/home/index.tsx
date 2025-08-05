import { View } from 'react-native';
import React from 'react';
import ThemedSafeArea from '../../components/ThemedSafeArea';
import CoinsList from '../../features/CoinsList';

export const HomeScreen = () => {
  return (
    <ThemedSafeArea className="bg-white flex-1">
      <View className="mx-sm mt-xl flex-1">
        <CoinsList />
      </View>
    </ThemedSafeArea>
  );
};
