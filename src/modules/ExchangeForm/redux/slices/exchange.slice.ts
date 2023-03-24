import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrency } from '@/models';

//TODO: add diff fields for buy and sell
interface IExchangeState {
  currencies: ICurrency[]
  filteredCurrencies: ICurrency[]
  fromCurrency: ICurrency | null,
  toCurrency: ICurrency | null,
  isFiltered: boolean
}

const exchangeState: IExchangeState = {
  currencies: [],
  filteredCurrencies: [],
  fromCurrency: null,
  toCurrency: null,
  isFiltered: false
};


export const exchangeSlice = createSlice({
  name: 'exchangeSlice',
  initialState: exchangeState,
  reducers: {
    setCurrencies: (state, { payload }: PayloadAction<ICurrency[]>) => {
      state.currencies = payload;
    }
    ,
    searchCurrency: (state, { payload }: PayloadAction<string>) => {
      const pattern = new RegExp(payload.toLowerCase());
      const data = state.currencies.filter(item =>
        pattern.test(item.name.toLowerCase())
        || pattern.test(item.ticker.toLowerCase())
      );
      state.filteredCurrencies = data;
      console.log(data);
    },
    setFromCurrency: (state, { payload }: PayloadAction<ICurrency>) => {
      state.fromCurrency = payload;
    },
    setToCurrency: (state, { payload }: PayloadAction<ICurrency>) => {
      state.toCurrency = payload;
    },
    setIsFiltered: (state, { payload }: PayloadAction<boolean>) => {
      state.isFiltered = payload;
    }
  }
});

export const { setCurrencies, searchCurrency, setToCurrency, setFromCurrency, setIsFiltered } = exchangeSlice.actions;