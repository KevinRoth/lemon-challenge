import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={{marginTop: 200 }}>
      <Text>Login Screen</Text>
      <Button  title="Login" onPress={() => {
        navigation.navigate("Home");
      }} />
    </View>
  )
}



