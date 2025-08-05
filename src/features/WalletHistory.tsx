import React, { useRef } from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import ThemedIcon from '../components/ThemedIcon';
import { useWalletHistory } from '../hooks/useWalletHistory';
import ThemedItem from '../components/ThemedItem';
import { EmptyImg } from '../assets';

interface Props {
  lastScanned: string | null;
  refreshFlag?: number;
}

export const WalletHistory: React.FC<Props> = ({
  lastScanned,
  refreshFlag,
}) => {
  const { wallets, toggleFavorite, removeWallet, reloadWallets } =
    useWalletHistory();

  const shownHighlightRef = useRef<string | null>(null);

  React.useEffect(() => {
    reloadWallets();
    shownHighlightRef.current = null;
  }, [refreshFlag, reloadWallets]);

  return (
    <View className="mt-lg">
      <ThemedText type="body-1" className="mb-xs">
        Historial de wallets escaneadas
      </ThemedText>
      <FlatList
        data={wallets}
        keyExtractor={item => item.address}
        renderItem={({ item }) => {
          let highlight = false;
          if (
            lastScanned &&
            item.address === lastScanned &&
            shownHighlightRef.current !== lastScanned
          ) {
            highlight = true;
            shownHighlightRef.current = lastScanned;
          }
          return (
            <ThemedItem
              title={item.address}
              bgColor={highlight ? 'bg-primary-50' : 'bg-white'}
              rightContainer={
                <View className="flex-col items-center">
                  <TouchableOpacity
                    onPress={() => toggleFavorite(item.address)}
                    className="mb-xs"
                  >
                    <ThemedIcon
                      name={item.favorite ? 'star' : 'star-o'}
                      size={22}
                      color={item.favorite ? '#a259e6' : '#bebebf'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeWallet(item.address)}>
                    <ThemedIcon name="trash" size={22} color="#bebebf" />
                  </TouchableOpacity>
                </View>
              }
            />
          );
        }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-md">
            <Image source={EmptyImg} className="w-24 h-24 my-sm" />

            <ThemedText
              type="body-2"
              className="text-center text-secondary-200 mt-md"
            >
              No hay wallets aún
            </ThemedText>
          </View>
        }
      />
    </View>
  );
};
