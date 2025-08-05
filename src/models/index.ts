export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

export interface SimpleCoin
  extends Omit<
    Coin,
    'current_price' | 'price_change_percentage_24h' | 'last_updated'
  > {}

export interface FiatCurrency {
  id: string;
  symbol: string;
  name: string;
}

export interface PriceResponse {
  [crypto: string]: {
    [fiat: string]: number;
  };
}

export type OrderType =
  | 'id_asc'
  | 'id_desc'
  | 'market_cap_asc'
  | 'market_cap_desc'
  | 'volume_asc'
  | 'volume_desc';

export type CategoryType =
  | 'ethereum-ecosystem'
  | 'cronos-ecosystem'
  | 'polygon-ecosystem'
  | 'stablecoins'
  | 'decentralized-exchange';
