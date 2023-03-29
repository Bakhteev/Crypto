import { type RootState } from '@/store/store'

export const getFromCurrencySelector = ({ exchange }: RootState) => exchange.fromCurrency
export const getToCurrencySelector = ({ exchange }: RootState) => exchange.toCurrency
