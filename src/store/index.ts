import { configureStore } from '@reduxjs/toolkit';
import { coinGeckoSlice } from './api';

export const store = configureStore({
  reducer: {
    [coinGeckoSlice.reducerPath]: coinGeckoSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(coinGeckoSlice.middleware),
});
