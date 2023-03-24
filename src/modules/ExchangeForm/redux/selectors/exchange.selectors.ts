import { RootState } from '@/store/store';

export const getCurrenciesSelector = ({ exchange }: RootState) => exchange.currencies;
export const getFilteredCurrenciesSelector = ({ exchange }: RootState) => exchange.filteredCurrencies;
export const getFromCurrencySelector = ({ exchange }: RootState) => exchange.fromCurrency;
export const getToCurrencySelector = ({ exchange }: RootState) => exchange.toCurrency;
export const getIsFilteredSelector = ({ exchange }: RootState) => exchange.isFiltered;