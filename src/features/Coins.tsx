import React from 'react';
import { FlatList, TouchableOpacity, Image, View } from 'react-native';
import ThemedItem from '../components/ThemedItem';
import { ThemedText } from '../components/ThemedText';

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
}

const Coins: React.FC<CoinsProps> = ({ coins, onSelect, onEndReached }) => (
  <FlatList
    data={coins}
    keyExtractor={item => item.id}
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
          title={item.symbol?.toUpperCase() || item.name}
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
  />
);

export default Coins;
