import React, { useState } from 'react';
import { TouchableOpacity, View, Modal, Image, Pressable } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import Coins from './Coins';
import ThemedIcon from '../components/ThemedIcon';
import ThemedSkeleton from '../components/ThemedSkeleton';

interface Currency {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  price_change_percentage_24h?: number;
  current_price?: number;
}

interface Props {
  type: 'crypto' | 'fiat';
  selected: Currency;
  onSelect: (c: Currency) => void;
  coins: Currency[];
  loading?: boolean;
}

export const ExchangeCurrencySelector: React.FC<Props> = ({
  type,
  selected,
  onSelect,
  coins,
  loading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center border border-secondary-100 rounded-lg px-sm py-xs"
        onPress={() => setModalVisible(true)}
      >
        {selected.image && (
          <Image
            source={{ uri: selected.image }}
            className="w-6 h-6 rounded-full mr-xs"
          />
        )}
        <ThemedText type="body-2">
          {selected.symbol || selected.name}
        </ThemedText>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <Pressable
          className="flex-1 justify-end bg-black/40"
          onPress={() => setModalVisible(false)}
        >
          <View
            className="bg-white rounded-t-xl p-md max-h-[70%]"
            onStartShouldSetResponder={() => true}
          >
            <View className="flex-row justify-end mb-xs">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <ThemedIcon name="close" size={24} color="#2c2c31" />
              </TouchableOpacity>
            </View>
            {loading ? (
              <>
                <ThemedSkeleton className="mt-md" width={350} height={80} />
                <ThemedSkeleton className="mt-xs" width={350} height={80} />
                <ThemedSkeleton className="mt-xs" width={350} height={80} />
                <ThemedSkeleton className="mt-xs" width={350} height={80} />
                <ThemedSkeleton className="mt-xs" width={350} height={80} />
                <ThemedSkeleton className="mt-xs" width={350} height={80} />
                <ThemedSkeleton className="mt-xs" width={350} height={80} />
              </>
            ) : (
              <Coins
                coins={coins}
                onSelect={coin => {
                  onSelect(coin);
                  setModalVisible(false);
                }}
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
