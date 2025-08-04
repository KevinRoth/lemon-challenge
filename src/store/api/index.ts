import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COINGECKO_API_KEY } from '@env';
import { Coin } from '../../models';

export const coinGeckoSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3',
    headers: {
      'Content-Type': 'application/json',
      'x-cg-demo-api-key': COINGECKO_API_KEY || '',
    },
  }),

  endpoints: builder => ({
    getCoins: builder.query<Coin[], void>({
      query: () => '/coins/markets',
    }),
  }),
});

// Export auto-generated hooks
export const { useGetCoinsQuery } = coinGeckoSlice;
