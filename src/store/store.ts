import { configureStore } from '@reduxjs/toolkit';
import { peesadApi } from '../services/api/peesadApi';
import { authSlice } from './auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/api/providers/authProvider';
import responseReducer from './slices/responseSlice';
import classReducer from './slices/classSlice';

export const store = configureStore({
  reducer: {
    class: classReducer,

    auth: authSlice.reducer,
    [peesadApi.reducerPath]: peesadApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    responses: responseReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peesadApi.middleware,  authApi.middleware,),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
