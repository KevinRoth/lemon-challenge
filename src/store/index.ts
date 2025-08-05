import { configureStore } from '@reduxjs/toolkit';
import { coinGeckoSlice } from './api';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    [coinGeckoSlice.reducerPath]: coinGeckoSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(coinGeckoSlice.middleware),
});
