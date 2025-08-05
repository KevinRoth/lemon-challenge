import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface WalletItem {
  address: string;
  favorite: boolean;
}

const STORAGE_KEY = 'wallet_history';

export const useWalletHistory = () => {
  const [wallets, setWallets] = useState<WalletItem[]>([]);

  const reloadWallets = useCallback(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setWallets(JSON.parse(data));
      else setWallets([]);
    });
  }, []);

  useEffect(() => {
    reloadWallets();
  }, [reloadWallets]);

  const saveWallets = async (newWallets: WalletItem[]) => {
    setWallets(newWallets);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWallets));
  };

  const addWallet = useCallback(async (address: string) => {
    setWallets(prev => {
      if (prev.find(w => w.address === address)) {
        Alert.alert('Error', 'La dirección ya existe en el historial.');
        return prev;
      }
      const updated = [{ address, favorite: false }, ...prev];
      saveWallets(updated);
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((address: string) => {
    setWallets(prev => {
      const updated = prev.map(w =>
        w.address === address ? { ...w, favorite: !w.favorite } : w,
      );
      saveWallets(updated);
      return updated;
    });
  }, []);

  const removeWallet = useCallback(
    (address: string) => {
      setWallets(prev => {
        const updated = prev.filter(w => w.address !== address);
        saveWallets(updated).then(() => {
          reloadWallets();
        });
        return updated;
      });
    },
    [reloadWallets],
  );

  return { wallets, addWallet, toggleFavorite, removeWallet, reloadWallets };
};
