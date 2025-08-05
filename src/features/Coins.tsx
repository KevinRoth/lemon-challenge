import React from 'react';
import { FlatList, TouchableOpacity, Image, View } from 'react-native';
import ThemedItem from '../components/ThemedItem';
import { ThemedText } from '../components/ThemedText';
import { SearchImg } from '../assets';
import ThemedButton from '../components/ThemedButton';

interface CoinItem {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  current_price?: number;
  price_change_percentage_24h?: number;
}

interface CoinsProps {
  coins: CoinItem[];
  onSelect?: (coin: CoinItem) => void;
  onEndReached?: () => void;
  onRetry?: () => void;
}

const Coins: React.FC<CoinsProps> = ({
  coins,
  onSelect,
  onEndReached,
  onRetry,
}) => (
  <FlatList
    data={coins}
    keyExtractor={item => `${item.id}-${Date.now()}`}
    onEndReached={onEndReached}
    renderItem={({ item }) => (
      <TouchableOpacity disabled={!onSelect} onPress={() => onSelect?.(item)}>
        <ThemedItem
          leftContainer={
            item.image ? (
              <Image
                source={{ uri: item.image }}
                className="w-12 h-12 rounded-full mr-xs"
              />
            ) : null
          }
          title={`${item.symbol?.toUpperCase()} - ${item.name}`}
          description={
            item.current_price !== undefined
              ? `$${item.current_price}`
              : undefined
          }
          rightContainer={
            item.price_change_percentage_24h !== undefined ? (
              <ThemedText
                type="body-2"
                color={
                  item.price_change_percentage_24h > 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {item.price_change_percentage_24h.toFixed(2)}
                {'% '}
                {item.price_change_percentage_24h > 0 ? '▲' : '▼'}
              </ThemedText>
            ) : null
          }
        />
      </TouchableOpacity>
    )}
    ItemSeparatorComponent={() => <View className="h-2" />}
    initialNumToRender={15}
    ListEmptyComponent={
      <View className="items-center justify-center mt-md">
        <Image source={SearchImg} className="w-24 h-24 my-sm" />
        <ThemedText
          type="body-2"
          className="text-center text-secondary-200 mt-md"
        >
          No hay criptomonedas para tu búsqueda
        </ThemedText>
        <ThemedButton
          type="secondary"
          textColor="text-primary-500"
          className="mt-md"
          onPress={onRetry}
        >
          Volver a intentar
        </ThemedButton>
      </View>
    }
  />
);

export default Coins;
