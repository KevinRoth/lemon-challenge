import React, { useState } from 'react';
import { View } from 'react-native';
import ThemedSafeArea from '../../components/ThemedSafeArea';
import { ThemedText } from '../../components/ThemedText';
import { WalletHistory } from '../../features/WalletHistory';
import { WalletScanner } from '../../features/WalletScanner';

export const WalletScannerScreen = () => {
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  return (
    <ThemedSafeArea className="flex-1 bg-white">
      <View className="mx-sm mt-xl flex-1">
        <ThemedText type="title" className="text-center mb-lg">
          Scanner de Wallet
        </ThemedText>
        <WalletScanner
          onScanned={address => {
            setLastScanned(address);
            setRefreshFlag(f => f + 1);
          }}
        />
        <WalletHistory lastScanned={lastScanned} refreshFlag={refreshFlag} />
      </View>
    </ThemedSafeArea>
  );
};
