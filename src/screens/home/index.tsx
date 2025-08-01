import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 200 }}>
      <Text>Home Screen</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
