import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COINGECKO_API_KEY } from '@env';
import { Coin } from '../../models';
import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.coingecko.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
    'x-cg-demo-api-key': COINGECKO_API_KEY || '',
  },
});

const wrappedBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  console.log('RTK Query Request:', args); // Log the request details
  const result = await baseQuery(args, api, extraOptions);
  console.log('RTK Query Response:', result); // Log the response details
  return result;
};

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

interface GetCoinsParams {
  page?: number;
  per_page?: number;
  order?: OrderType;
  search?: string;
  price_min?: number;
  price_max?: number;
  variation?: 'positive' | 'negative';
  category?: CategoryType;
}

export const coinGeckoSlice = createApi({
  reducerPath: 'api',
  baseQuery: wrappedBaseQuery,
  endpoints: builder => ({
    getCoins: builder.query<Coin[], GetCoinsParams>({
      query: (params = {}) => {
        const {
          page = 1,
          per_page = 25,
          order = 'market_cap_desc',
          search,
          price_min,
          price_max,
          variation,
          category, // <-- agregado
        } = params;
        let url = `/coins/markets?vs_currency=usd&page=${page}&per_page=${per_page}&order=${order}&include_tokens=top`;
        if (search) url += `&ids=${encodeURIComponent(search)}`;
        if (category) url += `&category=${encodeURIComponent(category)}`; // <-- agregado
        // Filters will be applied client-side as CoinGecko API doesn't support price/variation filters directly
        return url;
      },
      // Optionally, transform response for client-side filtering
      transformResponse: (
        response: Coin[],
        meta,
        arg: GetCoinsParams | void,
      ) => {
        let data = response;
        if (arg?.price_min !== undefined) {
          data = data.filter(c => c.current_price >= arg.price_min!);
        }
        if (arg?.price_max !== undefined) {
          data = data.filter(c => c.current_price <= arg.price_max!);
        }
        if (arg?.variation === 'positive') {
          data = data
            .filter(c => c.price_change_percentage_24h > 0)
            .sort((a, b) => {
              return (
                b.price_change_percentage_24h - a.price_change_percentage_24h
              );
            });
        }
        if (arg?.variation === 'negative') {
          data = data
            .filter(c => c.price_change_percentage_24h < 0)
            .sort((a, b) => {
              return (
                a.price_change_percentage_24h - b.price_change_percentage_24h
              );
            });
        }

        if (response.length > 0) {
          data = data.filter(
            coin => coin.price_change_percentage_24h && coin.current_price,
          );
        }

        return data;
      },
    }),
  }),
});

// Export auto-generated hooks
export const { useGetCoinsQuery } = coinGeckoSlice;
