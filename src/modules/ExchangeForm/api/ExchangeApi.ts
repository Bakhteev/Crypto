import { baseApi } from '@/shared/api';
import { ICurrency, IEstimatedExchangeAmount, IMinimalExchangeAmount } from '@/models';

//TODO: destruct
enum FlowTypes {
  STANDARD = 'standard',
  FIXED_RATE = 'fixed-rate'
}

export interface IListOfAvailableCurrenciesParams {
  active?: boolean,
  flow?: FlowTypes,
  buy?: string,
  sell?: string
}

export interface IMinimalExchangeAmountParams {
  fromCurrency: string
  toCurrency: string
  fromNetwork?: string,
  toNetwork?: string,
  flow?: FlowTypes
}

export interface IEstimatedExchangeAmountParams {
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
    getListOfAvailableCurrencies: builder.query<ICurrency[], IListOfAvailableCurrenciesParams>({
      query: (params: IListOfAvailableCurrenciesParams) => ({
        url: '/currencies',
        method: 'GET',
        params
      }),
      providesTags: ['exchange']
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
