import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api';
import { exchangeSlice } from '@/modules';
import { globalLoadingSlice } from '@/store/slices/GlobalLoading.slice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [exchangeSlice.name]: exchangeSlice.reducer,
  [globalLoadingSlice.name]: globalLoadingSlice.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
      .concat(baseApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
