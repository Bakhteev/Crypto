import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrency } from '@/models';

interface IExchangeState {
  fromCurrency: ICurrency | null,
  toCurrency: ICurrency | null,
}

const exchangeState: IExchangeState = {
  fromCurrency: null,
  toCurrency: null
};


export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: exchangeState,
  reducers: {
    setFromCurrency: (state, { payload }: PayloadAction<ICurrency>) => {
      state.fromCurrency = payload;
    },
    setToCurrency: (state, { payload }: PayloadAction<ICurrency>) => {
      state.toCurrency = payload;
    }
  }
});

export const {
  setToCurrency,
  setFromCurrency
} = exchangeSlice.actions;