import { CategoryType, OrderType } from '.';

export interface GetCoinsParams {
  page?: number;
  per_page?: number;
  order?: OrderType;
  search?: string;
  price_min?: number;
  price_max?: number;
  variation?: 'positive' | 'negative';
  category?: CategoryType;
}

export interface PriceParams {
  ids: string;
  vs_currencies: string;
}
