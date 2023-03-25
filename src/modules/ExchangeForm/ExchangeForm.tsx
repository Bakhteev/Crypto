import React, { ChangeEvent, useEffect, useState } from 'react';
import { ICurrency } from '@/models';
import { useGetListOfAvailableCurrenciesQuery, useLazyGetMinAmountQuery } from './api';
import './ExchangeForm.scss';
import { getFromCurrencySelector, getToCurrencySelector, setFromCurrency, setToCurrency } from './redux';
import { useAppDispatch, useAppSelector, useDebounce } from '@/shared/hooks';
import { UiButton, UiFormField } from '@/shared/ui';
import { SearchFormField } from '@/components';
import { UiLoader } from '@/shared/ui/UiLoader';
import swap from '@/assets/icons/swap.svg';
//FIXME: remove inline styles
//FIXME: destruct ??
//FIXME: add slice from min amount
//TODO: add validation
//TODO: error handing
const ExchangeForm = () => {

  const dispatch = useAppDispatch();

  const [searchValueToBuy, setSearchValueToBuy] = useState<string>('');
  const [searchValueToSell, setSearchValueToSell] = useState<string>('');

  const [currenciesToBuy, setCurrenciesToBuy] = useState<ICurrency[]>([]);
  const [currenciesToSell, setCurrenciesToSell] = useState<ICurrency[]>([]);

  const [toAmount, setToAmount] = useState<number>();
  const [fromAmount, setFromAmount] = useState<number>();


  const debouncedValueToBuy = useDebounce<string>(searchValueToBuy, 0);
  const debouncedValueToSell = useDebounce<string>(searchValueToSell, 0);

  const fromCurrency = useAppSelector(getFromCurrencySelector);
  const toCurrency = useAppSelector(getToCurrencySelector);

  const {
    isLoading: isLoadingToBuy,
    isError: isErrorToBuy,
    data: fetchedCurrenciesToBuy
  } = useGetListOfAvailableCurrenciesQuery({
    active: true,
    buy: true
  });
  const {
    isLoading: isLoadingToSell,
    isError: isErrorToSell,
    data: fetchedCurrenciesToSell
  } = useGetListOfAvailableCurrenciesQuery({
    active: true,
    sell: true
  });

  const [getMinAmountQuery, { data, isError, isLoading }] = useLazyGetMinAmountQuery();

  const filter = (value: string, arr: ICurrency[]) => {
    const pattern = new RegExp(value.toLowerCase());
    return arr.filter(item =>
      pattern.test(item.name.toLowerCase())
      || pattern.test(item.ticker.toLowerCase())
    );
  };


  useEffect(() => {
    if (fetchedCurrenciesToSell) {
      setCurrenciesToSell(fetchedCurrenciesToSell);
      dispatch(setToCurrency(fetchedCurrenciesToSell[0]));
    }
    if (fetchedCurrenciesToBuy) {
      dispatch(setFromCurrency(fetchedCurrenciesToBuy[0]));
      setCurrenciesToBuy(fetchedCurrenciesToBuy);
    }
  }, [fetchedCurrenciesToSell, fetchedCurrenciesToBuy]);


  useEffect(() => {
    if (debouncedValueToBuy) {
      setCurrenciesToBuy(filter(debouncedValueToBuy.toLowerCase(), currenciesToBuy));
    } else {
      setCurrenciesToBuy(fetchedCurrenciesToBuy ?? []);
    }
    if (debouncedValueToSell) {
      setCurrenciesToSell(filter(debouncedValueToSell.toLowerCase(), currenciesToSell));
    } else {
      setCurrenciesToSell(fetchedCurrenciesToSell ?? []);
    }
  }, [debouncedValueToBuy, debouncedValueToSell]);

  useEffect(() => {
    if (fromCurrency.ticker && fromCurrency.network && toCurrency.ticker && toCurrency.network) {
      getMinAmountQuery({
        fromCurrency: fromCurrency.ticker,
        toCurrency: toCurrency.ticker,
        toNetwork: toCurrency.network,
        fromNetwork: fromCurrency.network
      });
      if (data) {
        setFromAmount(data.minAmount);
      }
    }

  }, [fromCurrency, toCurrency, data]);


  const amountHandler = (e: ChangeEvent<HTMLInputElement>) => {

  };

  const getCurrencyFrom = (e: React.MouseEvent, value: ICurrency) => {
    dispatch(setFromCurrency(value));
  };
  const getCurrencyTo = (e: React.MouseEvent, value: ICurrency) => {
    dispatch(setToCurrency(value));
  };


  if (isLoadingToBuy || isLoadingToSell) return <UiLoader />;


  return (
    <form className={'exchange-form'}>
      <div className='flex exchange-form__top align-items-center' style={{ flexWrap: 'wrap' }}>
        <div className={'exchange-form__block'}>
          <SearchFormField
            searchHandler={(e) => setSearchValueToBuy(e.target.value.trim())}
            searchValue={searchValueToBuy}
            amountHandler={amountHandler}
            onClick={getCurrencyFrom}
            currencies={currenciesToBuy}
            chosenCurrency={fromCurrency}
            amountValue={fromAmount?.toString() || '0.1'}
            loading={isLoadingToBuy}
          />
        </div>
        <img src={swap} alt='swap' className={'exchange-form__img'} />
        <div className={'exchange-form__block'}>
          <SearchFormField
            searchHandler={(e) => setSearchValueToSell(e.target.value.trim())}
            searchValue={searchValueToSell}
            amountHandler={amountHandler}
            onClick={getCurrencyTo}
            currencies={currenciesToSell}
            chosenCurrency={toCurrency}
            loading={isLoadingToSell}
          />
        </div>
      </div>
      <div className='exchange-form__bottom'>
        <span className={'exchange-form__address'}>Your Ethereum address</span>
        <div className='flex' style={{ gap: 32, flexWrap: 'wrap' }}>
          <UiFormField className='flex-1' />
          <UiButton>
            Exchange
          </UiButton>
        </div>
      </div>
    </form>
  );
};

export default ExchangeForm;