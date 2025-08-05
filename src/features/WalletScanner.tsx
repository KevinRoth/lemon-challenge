import React, { useCallback, useState } from 'react';
import { Image, View } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { ThemedText } from '../components/ThemedText';
import ThemedButton from '../components/ThemedButton';
import { useWalletHistory } from '../hooks/useWalletHistory';
import { CheckImg } from '../assets';

interface Props {
  onScanned: (address: string) => void;
}

export const WalletScanner: React.FC<Props> = ({ onScanned }) => {
  const { addWallet } = useWalletHistory();
  const [scanned, setScanned] = useState(false);

  const handleReadCode = useCallback(
    (event: { nativeEvent: { codeStringValue: string } }) => {
      const address = event.nativeEvent.codeStringValue;
      if (address) {
        addWallet(address);
        onScanned(address);
        setScanned(true);
      }
    },
    [addWallet, onScanned],
  );

  const handleRetry = () => {
    setScanned(false);
  };

  return (
    <View className="mb-md">
      <View className="rounded-xl overflow-hidden h-96 bg-black">
        {!scanned ? (
          <Camera
            scanBarcode
            onReadCode={handleReadCode}
            showFrame
            cameraType={CameraType.Back}
            laserColor="red"
            frameColor="white"
            style={{ flex: 1, height: '100%' }}
          />
        ) : (
          <View className="flex-1 w-full h-full items-center justify-center bg-white border-2 rounded-xl border-secondary-50">
            <Image source={CheckImg} className="w-24 h-24 mb-md" />
            <ThemedText type="title" className="text-center mb-lg">
              Tu dirección ha sido escaneada
            </ThemedText>
            <ThemedButton
              textColor="text-primary-500"
              type="secondary"
              onPress={handleRetry}
            >
              Volver a intentar
            </ThemedButton>
          </View>
        )}
      </View>
    </View>
  );
};
