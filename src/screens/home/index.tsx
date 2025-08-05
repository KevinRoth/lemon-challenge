import { View } from 'react-native';
import React from 'react';
import ThemedSafeArea from '../../components/ThemedSafeArea';
import CoinsList from '../../features/CoinsList';
import Icon from 'react-native-vector-icons/FontAwesome';

export const HomeScreen = () => {
  return (
    <ThemedSafeArea className="bg-white flex-1">
      <Icon name="gear" size={30} color="#900" />
      <View className="mx-sm mt-xl flex-1">
        <CoinsList />
      </View>
    </ThemedSafeArea>
  );
};
