import React, { useState } from 'react';
import {
  Image,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import ThemedItem from '../components/ThemedItem';
import ThemedCategories from '../components/ThemedCategories';
import ThemedInput from '../components/ThemedInput';
import { Coin } from '../models';
import { useGetCoinsQuery } from '../store/api';

import type { OrderType, CategoryType } from '../store/api';
import { ThemedText } from '../components/ThemedText';
import ThemedAnimatedTranslateTop from '../components/ThemedAnimatedTranslateTop';
import Icon from 'react-native-vector-icons/FontAwesome';

const ORDERS: { label: string; value: OrderType }[] = [
  { label: 'Market Cap ↑', value: 'market_cap_asc' },
  { label: 'Market Cap ↓', value: 'market_cap_desc' },
  { label: 'Volume ↑', value: 'volume_asc' },
  { label: 'Volume ↓', value: 'volume_desc' },
  { label: 'ID ↑', value: 'id_asc' },
  { label: 'ID ↓', value: 'id_desc' },
];

const CATEGORIES: { label: string; value: CategoryType | '' }[] = [
  { label: 'Todas', value: '' },
  { label: 'Ethereum', value: 'ethereum-ecosystem' },
  { label: 'Cronos', value: 'cronos-ecosystem' },
  { label: 'Polygon', value: 'polygon-ecosystem' },
  { label: 'Stablecoins', value: 'stablecoins' },
  { label: 'DEX', value: 'decentralized-exchange' },
];

const VARIATIONS = [
  { label: 'Ganadores', value: 'positive' },
  { label: 'Perdedores', value: 'negative' },
];

const CoinsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<OrderType>('market_cap_desc');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [variation, setVariation] = useState<'all' | 'positive' | 'negative'>(
    'all',
  );

  const [category, setCategory] = useState<CategoryType | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetCoinsQuery({
    page,
    per_page: perPage,
    order,
    search: search.trim() ? search.trim().toLowerCase() : undefined,
    category: category || undefined,
    variation: variation === 'all' ? undefined : variation,
    price_min: priceMin ? Number(priceMin) : undefined,
    price_max: priceMax ? Number(priceMax) : undefined,
  });

  const [coins, setCoins] = useState<Coin[]>([]);

  React.useEffect(() => {
    if (isFetching) return;
    if (page === 1) setCoins(data);
    else if (page > 1 && data.length) setCoins(prev => [...prev, ...data]);
  }, [data, page, isFetching]);

  const onEndReached = () => {
    if (!isFetching && data.length === 25) setPage(p => p + 1);
  };

  const renderItem: ListRenderItem<Coin> = ({ item: coin }) => {
    const textColorPriceChange =
      coin?.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500';

    return (
      <ThemedItem
        key={coin?.id}
        leftContainer={
          <Image
            source={{ uri: coin?.image }}
            className="w-12 h-12 rounded-full"
            resizeMode="contain"
          />
        }
        title={coin?.name}
        description={`$${coin?.current_price}`}
        rightContainer={
          <View>
            <ThemedText type="body-2" color={textColorPriceChange}>
              {`${coin?.price_change_percentage_24h?.toFixed(2)}% ${
                coin?.price_change_percentage_24h > 0 ? '↑' : '↓'
              }`}
            </ThemedText>
          </View>
        }
      />
    );
  };

  const resetFilters = () => {
    setPage(1);
    setSearch('');
    setOrder('market_cap_desc');
    setPriceMin('');
    setPriceMax('');
    setVariation('all');
    setCategory('');
  };

  return (
    <View className="flex-1">
      <View className="flex-row mb-xs">
        <ThemedInput
          placeholder="Buscar por nombre completo"
          value={search}
          onChangeText={setSearch}
          className="flex-1 mr-1"
          returnKeyType="search"
          onSubmitEditing={() => {
            setPage(1);
          }}
        />
      </View>

      <View className="flex-row my-xs mx-xs">
        <Icon
          onPress={() => setShowFilters(prev => !prev)}
          name="sliders"
          size={30}
          color="#a259e6"
        />
      </View>

      {showFilters && (
        <ThemedAnimatedTranslateTop>
          <View className="my-sm">
            <ThemedCategories
              categories={ORDERS}
              selected={order}
              onSelect={value => {
                setOrder(value as OrderType);
                setPage(1);
              }}
            />
          </View>
          <View className="flex-row mb-xs items-center">
            <ThemedInput
              placeholder="Precio min"
              value={priceMin}
              onChangeText={setPriceMin}
              keyboardType="numeric"
              className="flex-1 mr-1"
            />
            <ThemedInput
              placeholder="Precio max"
              value={priceMax}
              onChangeText={setPriceMax}
              keyboardType="numeric"
              className="flex-1 mr-1"
            />
          </View>
          <View className="flex-row my-sm items-center">
            <ThemedCategories
              categories={VARIATIONS}
              selected={variation === 'all' ? '' : variation}
              onSelect={value => {
                setVariation(value as 'positive' | 'negative');
                setPage(1);
                setPerPage(100);
              }}
            />
          </View>
          <View>
            <ThemedText type="body-1" className="mb-sm">
              Marketplaces por categoría:
            </ThemedText>
            <ThemedCategories
              categories={CATEGORIES}
              selected={category}
              onSelect={value => {
                setCategory(value as CategoryType);
                setPage(1);
              }}
            />
          </View>
          <TouchableOpacity
            onPress={resetFilters}
            className="my-xs p-xs bg-secondary-50 rounded"
          >
            <ThemedText
              type="body-1"
              className="text-center text-secondary-500"
            >
              Resetear búsqueda
            </ThemedText>
          </TouchableOpacity>
        </ThemedAnimatedTranslateTop>
      )}
      <FlatList
        data={coins}
        renderItem={renderItem}
        keyExtractor={coin => coin.id}
        initialNumToRender={15}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={
          !isLoading ? (
            <ThemedText type="body-1" className="text-center mt-md">
              No hay resultados
            </ThemedText>
          ) : null
        }
      />
    </View>
  );
};

export default CoinsList;
