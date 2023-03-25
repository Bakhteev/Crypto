import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrency } from '@/models';

//TODO: add diff fields for buy and sell ??
interface IExchangeState {
  // currenciesToBuy: ICurrency[],
  // currenciesToSell: ICurrency[],
  fromCurrency: ICurrency,
  toCurrency: ICurrency,
  // isFiltered: boolean
}


const exchangeState: IExchangeState = {
  // currenciesToBuy: [],
  // currenciesToSell: [],

  // filteredCurrencies: [],
  fromCurrency: {
    ticker: '',
    name: '',
    image: '',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: false,
    network: '',
    tokenContract: false,
    buy: false,
    sell: false
  },
  toCurrency: {
    ticker: '',
    name: '',
    image: '',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: false,
    network: '',
    tokenContract: false,
    buy: false,
    sell: false
  }
  // isFiltered: false
};


export const exchangeSlice = createSlice({
  name: 'exchangeSlice',
  initialState: exchangeState,
  reducers: {
    // setCurrenciesToBuy: (state, { payload }: PayloadAction<ICurrency[]>) => {
    //   state.currenciesToBuy = payload;
    // },
    // setCurrenciesToSell: (state, { payload }: PayloadAction<ICurrency[]>) => {
    //   state.currenciesToSell = payload;
    // },
    setFromCurrency: (state, { payload }: PayloadAction<ICurrency>) => {
      state.fromCurrency = payload;
    },
    setToCurrency: (state, { payload }: PayloadAction<ICurrency>) => {
      state.toCurrency = payload;
    }
  }
});

export const {
  // setCurrenciesToBuy,
  // setCurrenciesToSell,
  setToCurrency,
  setFromCurrency
} = exchangeSlice.actions;