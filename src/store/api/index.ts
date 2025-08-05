import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COINGECKO_API_KEY } from '@env';
import { Coin, FiatCurrency, PriceResponse, SimpleCoin } from '../../models';
import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query';
import { GetCoinsParams, PriceParams } from '../../models/params';

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
  console.log('RTK Query Request:', args);
  const result = await baseQuery(args, api, extraOptions);
  console.log('RTK Query Response:', result);
  return result;
};

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
        return url;
      },
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
    getSupportedCoins: builder.query<SimpleCoin[], void>({
      query: () =>
        '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
      transformResponse: (response: any[]) =>
        response.map(c => ({
          id: c.id,
          symbol: c.symbol,
          name: c.name,
          image: c.image,
          price_change_percentage_24h: c.price_change_percentage_24h,
          current_price: c.current_price,
        })),
    }),
    getSupportedFiats: builder.query<FiatCurrency[], void>({
      query: () => '/simple/supported_vs_currencies',
      transformResponse: (response: string[]) =>
        response
          .filter(f => ['usd', 'eur', 'ars', 'pen'].includes(f.toLowerCase()))
          .map(f => ({
            id: f,
            symbol: f.toUpperCase(),
            name: f.toUpperCase(),
          })),
    }),
    getPrice: builder.query<PriceResponse, PriceParams>({
      query: ({ ids, vs_currencies }) =>
        `/simple/price?ids=${ids}&vs_currencies=${vs_currencies}`,
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetSupportedCoinsQuery,
  useGetSupportedFiatsQuery,
  useGetPriceQuery,
} = coinGeckoSlice;
