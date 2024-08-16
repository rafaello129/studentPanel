import { configureStore } from '@reduxjs/toolkit';
import { peesadApi } from '../services/api/peesadApi';
import { authSlice } from './auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/api/providers/authProvider';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [peesadApi.reducerPath]: peesadApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peesadApi.middleware,  authApi.middleware,),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
