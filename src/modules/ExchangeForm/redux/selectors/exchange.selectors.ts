import { RootState } from '@/store/store';

// export const getCurrenciesToBuySelector = ({ exchange }: RootState) => exchange.currenciesToBuy;
// export const getCurrenciesToSellSelector = ({ exchange }: RootState) => exchange.currenciesToSell;
export const getFromCurrencySelector = ({ exchange }: RootState) => exchange.fromCurrency;
export const getToCurrencySelector = ({ exchange }: RootState) => exchange.toCurrency;
