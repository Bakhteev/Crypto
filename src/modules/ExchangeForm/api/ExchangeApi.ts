import { baseApi } from '@/shared/api';
import { ICurrency, IEstimatedExchangeAmount, IMinimalExchangeAmount } from '@/models';
import { BreakPoints } from './enums';
import {
  IEstimatedExchangeAmountRequest,
  IListOfAvailableCurrenciesRequest,
  IMinimalExchangeAmountRequest
} from '@/modules/ExchangeForm/api/interfaces';

export const exchangeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListOfAvailableCurrencies: builder.query<ICurrency[], IListOfAvailableCurrenciesRequest>({
      query: (params: IListOfAvailableCurrenciesRequest) => ({
        url: BreakPoints.LIST_OF_AVAILABLE_CURRENCIES,
        method: 'GET',
        params
      })
    }),
    getMinAmount: builder.query<IMinimalExchangeAmount, IMinimalExchangeAmountRequest>({
      query: (params: IMinimalExchangeAmountRequest) => ({
        url: BreakPoints.MINIMAL_EXCHANGE_AMOUNT,
        method: 'GET',
        params
      })
    }),
    getEstimatedAmount: builder.query<IEstimatedExchangeAmount, IEstimatedExchangeAmountRequest>({
      query: (params: IEstimatedExchangeAmountRequest) => ({
        url: BreakPoints.ESTIMATED_EXCHANGE_AMOUNT,
        params
      })
    })
  })
});

export const {
  useGetListOfAvailableCurrenciesQuery,
  useLazyGetListOfAvailableCurrenciesQuery,
  useLazyGetMinAmountQuery,
  useGetMinAmountQuery,
  useGetEstimatedAmountQuery,
  usePrefetch
} = exchangeApi;
