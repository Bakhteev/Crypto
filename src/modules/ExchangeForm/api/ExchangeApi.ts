import { baseApi } from '@/shared/api';
import { ICurrency, IEstimatedExchangeAmount, IMinimalExchangeAmount } from '@/models';


enum FlowTypes {
  STANDARD = 'standard',
  FIXED_RATE = 'fixed-rate'
}

interface ICurrencyParams {
  active: boolean,
  flow: FlowTypes,
  buy: '',
  sell: ''
}

export interface IMinimalExchangeAmountParams {
  fromCurrency: string
  toCurrency: string
  fromNetwork?: string,
  toNetwork?: string,
  flow?: FlowTypes
}

interface IEstimatedExchangeAmountParams {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number; // must be > 0
  toAmount: number; // must me > 0
  fromNetwork?: string;
  toNetwork?: string;
  flow?: FlowTypes;
  type?: string;
  useRateId?: boolean;
}

export const exchangeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListOfAvailableCurrencies: builder.query<ICurrency[], ICurrencyParams>({
      query: (params: ICurrencyParams) => ({
        url: '/currencies',
        method: 'GET',
        params
      })
    }),
    getMinAmount: builder.query<IMinimalExchangeAmount, IMinimalExchangeAmountParams>({
      query: (params: IMinimalExchangeAmountParams) => ({
        url: '/min-amount',
        method: 'GET',
        params
      })
    }),
    getEstimatedAmount: builder.query<IEstimatedExchangeAmount, IEstimatedExchangeAmountParams>({
      query: (params: IEstimatedExchangeAmountParams) => ({
        url: '/estimated-amount',
        params
      })
    })
  })
});

export const { useGetListOfAvailableCurrenciesQuery, useGetMinAmountQuery, useGetEstimatedAmountQuery } = exchangeApi;
