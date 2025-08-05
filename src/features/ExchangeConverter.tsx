import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  useGetSupportedCoinsQuery,
  useGetSupportedFiatsQuery,
  useGetPriceQuery,
} from '../store/api';
import ThemedInput from '../components/ThemedInput';
import ThemedIcon from '../components/ThemedIcon';
import { ThemedText } from '../components/ThemedText';
import { ExchangeCurrencySelector } from './ExchangeCurrencySelector';
import ThemedButton from '../components/ThemedButton';

const DEFAULT_CRYPTO = { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' };
const DEFAULT_FIAT = { id: 'usd', symbol: 'USD', name: 'USD' };

export const ExchangeConverter: React.FC = () => {
  const [crypto, setCrypto] = useState(DEFAULT_CRYPTO);
  const [fiat, setFiat] = useState(DEFAULT_FIAT);
  const [direction, setDirection] = useState<'cryptoToFiat' | 'fiatToCrypto'>(
    'cryptoToFiat',
  );
  const [amount, setAmount] = useState<string>('1');

  const { data: coins = [], isLoading: loadingCoins } =
    useGetSupportedCoinsQuery();
  const { data: fiats = [], isLoading: loadingFiats } =
    useGetSupportedFiatsQuery();

  const priceParams = useMemo(() => {
    return direction === 'cryptoToFiat'
      ? { ids: crypto.id, vs_currencies: fiat.id }
      : { ids: crypto.id, vs_currencies: fiat.id };
  }, [crypto, fiat, direction]);

  const {
    data: priceData,
    isLoading: loadingPrice,
    refetch,
  } = useGetPriceQuery(priceParams, { skip: !crypto.id || !fiat.id });

  const getConversion = () => {
    if (!priceData || !priceData[crypto.id] || !priceData[crypto.id][fiat.id])
      return '';
    const price = priceData[crypto.id][fiat.id];
    if (direction === 'cryptoToFiat') {
      return (parseFloat(amount || '0') * price).toLocaleString(undefined, {
        maximumFractionDigits: 8,
      });
    } else {
      return (parseFloat(amount || '0') / price).toLocaleString(undefined, {
        maximumFractionDigits: 8,
      });
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center mb-md">
        <View className="flex-1">
          <ExchangeCurrencySelector
            type="crypto"
            selected={crypto}
            onSelect={setCrypto}
            coins={coins}
            loading={loadingCoins}
          />
        </View>
        <TouchableOpacity
          className="mx-xs"
          onPress={() =>
            setDirection(d =>
              d === 'cryptoToFiat' ? 'fiatToCrypto' : 'cryptoToFiat',
            )
          }
        >
          <ThemedIcon name="exchange" size={28} color="#a259e6" />
        </TouchableOpacity>
        <View className="flex-1">
          <ExchangeCurrencySelector
            type="fiat"
            selected={fiat}
            onSelect={setFiat}
            coins={fiats}
            loading={loadingFiats}
          />
        </View>
      </View>
      <View className="mb-md">
        <ThemedInput
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder={
            direction === 'cryptoToFiat'
              ? `Monto en ${crypto.symbol}`
              : `Monto en ${fiat.symbol}`
          }
        />
      </View>
      <View className="mb-md">
        {loadingPrice ? (
          <ActivityIndicator />
        ) : (
          <View className="p-xs rounded-xl bg-secondary-50">
            <ThemedText
              type="title-2"
              className="text-center"
              color="text-primary-500"
            >
              {amount || '0'}{' '}
              {direction === 'cryptoToFiat' ? crypto.symbol : fiat.symbol} ={' '}
              {getConversion()}{' '}
              {direction === 'cryptoToFiat' ? fiat.symbol : crypto.symbol}
            </ThemedText>
          </View>
        )}
      </View>

      <ThemedButton
        className="mt-xl"
        onPress={refetch}
        type="secondary"
        textColor="text-primary-500"
      >
        Actualizar precio
      </ThemedButton>
    </View>
  );
};
