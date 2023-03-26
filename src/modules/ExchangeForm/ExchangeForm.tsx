import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ICurrency } from '@/models';
import { useGetListOfAvailableCurrenciesQuery, useLazyGetEstimatedAmountQuery, useLazyGetMinAmountQuery } from './api';
import './ExchangeForm.scss';
import { getFromCurrencySelector, getToCurrencySelector, setFromCurrency, setToCurrency } from './redux';
import { useAppDispatch, useAppSelector, useDebounce } from '@/shared/hooks';
import { UiButton, UiFormField } from '@/shared/ui';
import { SearchFormField } from '@/components';
//@ts-ignore ?? for docker
import swap from '@/assets/icons/swap.svg';
import { setIsLoading } from '@/store/slices/GlobalLoading.slice';

const ExchangeForm = () => {

  const dispatch = useAppDispatch();

  const [searchValueToBuy, setSearchValueToBuy] = useState<string>('');
  const [searchValueToSell, setSearchValueToSell] = useState<string>('');

  const [currenciesToBuy, setCurrenciesToBuy] = useState<ICurrency[]>([]);
  const [currenciesToSell, setCurrenciesToSell] = useState<ICurrency[]>([]);

  const [toAmount, setToAmount] = useState<number | string>('');
  const [fromAmount, setFromAmount] = useState<number | string>('');
  const [address, setAddress] = useState('');
  const [validationError, setValidationError] = useState(false);

  const debouncedSearchToBuy = useDebounce<string>(searchValueToBuy, 100);
  const debouncedSearchToSell = useDebounce<string>(searchValueToSell, 100);
  const debouncedFromAmount = useDebounce<number | string>(fromAmount, 200);

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

  const [getMinAmountQuery, {
    data: minAmount,
    isError: isMinAmountError
  }] = useLazyGetMinAmountQuery();

  const [getEstimatedAmountQuery, { data: estimated, isError }] = useLazyGetEstimatedAmountQuery();


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
    }
    if (fetchedCurrenciesToBuy) {
      setCurrenciesToBuy(fetchedCurrenciesToBuy);
    }
  }, [fetchedCurrenciesToSell, fetchedCurrenciesToBuy]);


  useEffect(() => {
    if (debouncedSearchToBuy) {
      setCurrenciesToBuy(filter(debouncedSearchToBuy.toLowerCase(), currenciesToBuy));
    } else {
      setCurrenciesToBuy(fetchedCurrenciesToBuy ?? []);
    }
    if (debouncedSearchToSell) {
      setCurrenciesToSell(filter(debouncedSearchToSell.toLowerCase(), currenciesToSell));
    } else {
      setCurrenciesToSell(fetchedCurrenciesToSell ?? []);
    }
  }, [debouncedSearchToBuy, debouncedSearchToSell]);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      getMinAmountQuery({
        fromCurrency: fromCurrency.ticker,
        toCurrency: toCurrency.ticker,
        toNetwork: toCurrency.network,
        fromNetwork: fromCurrency.network
      });
      dispatch(setIsLoading(true));
    }

  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (fromCurrency && toCurrency && +debouncedFromAmount >= minAmount!.minAmount) {
      getEstimatedAmountQuery({
        fromCurrency: fromCurrency.ticker,
        toCurrency: toCurrency.ticker,
        toNetwork: toCurrency.network,
        fromNetwork: fromCurrency.network,
        fromAmount: debouncedFromAmount,
        toAmount: ''
      });
      dispatch(setIsLoading(true));
    }
  }, [debouncedFromAmount]);


  useEffect(() => {
    if (minAmount) {
      setFromAmount(minAmount.minAmount);
      getEstimatedAmountQuery({
        fromCurrency: fromCurrency!.ticker,
        toCurrency: toCurrency!.ticker,
        toNetwork: toCurrency!.network,
        fromNetwork: fromCurrency!.network,
        fromAmount: minAmount.minAmount,
        toAmount: ''
      });
    }
  }, [minAmount]);

  useEffect(() => {
    if (estimated) {
      setToAmount(estimated.toAmount);
      setFromAmount(estimated.fromAmount);
      dispatch(setIsLoading(false));
    }
  }, [estimated]);


  const amountHandlerFrom = (e: ChangeEvent<HTMLInputElement>, value: number) => {

    if (value < minAmount!.minAmount) {
      setToAmount('-----------');
    } else {
      setToAmount(estimated!.toAmount);
    }

    setFromAmount(value);
    if (value <= 0) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  };

  const getCurrencyFrom = (e: React.MouseEvent, value: ICurrency) => {
    dispatch(setFromCurrency(value));
  };
  const getCurrencyTo = (e: React.MouseEvent, value: ICurrency) => {
    dispatch(setToCurrency(value));
  };

  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Successfully exchanged');
  };

  return (
    <form onSubmit={onSubmit} className={'exchange-form'}>
      <div className='exchange-form__top'>
        <div className={'exchange-form__block'}>
          <SearchFormField
            searchHandler={(e) => setSearchValueToBuy(e.target.value.trim())}
            searchValue={searchValueToBuy}
            amountHandler={amountHandlerFrom}
            onClick={getCurrencyFrom}
            currencies={currenciesToBuy}
            chosenCurrency={fromCurrency!}
            amountValue={fromAmount?.toString() || ''}
            loading={isLoadingToBuy}
            error={validationError}
          />
        </div>
        <img src={swap} alt='swap' className={'exchange-form__img'} />
        <div className={'exchange-form__block'}>
          <SearchFormField
            searchHandler={(e) => setSearchValueToSell(e.target.value.trim())}
            searchValue={searchValueToSell}
            onClick={getCurrencyTo}
            currencies={currenciesToSell}
            chosenCurrency={toCurrency!}
            loading={isLoadingToSell}
            amountValue={toAmount?.toString() || ''}
            disabled={true}
          />
        </div>
      </div>
      <div className='exchange-form__bottom'>
        <span className={'exchange-form__address'}>Your Ethereum address</span>
        <div className='flex'>
          <UiFormField
            className='flex-1'
            onChange={handleAddress}
            value={address}
            required
          />
          <UiButton
            disabled={isLoadingToSell && isLoadingToBuy || !estimated || !minAmount}
            error={!estimated || !minAmount}
          >
            Exchange
          </UiButton>
        </div>
      </div>
    </form>
  );
};

export default ExchangeForm;