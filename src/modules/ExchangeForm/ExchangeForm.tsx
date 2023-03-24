import React, { ChangeEvent, useState } from 'react';
import { UiButton, UiFormField } from '@/shared/ui';
import { ICurrency } from '@/models';
import { SearchFormField } from '@/components';
import { useGetListOfAvailableCurrenciesQuery } from './api';
import swap from '@/assets/icons/swap.svg';
import './ExchangeForm.scss';
import {
  getFilteredCurrenciesSelector,
  getFromCurrencySelector,
  getIsFilteredSelector,
  getToCurrencySelector,
  searchCurrency,
  setCurrencies,
  setFromCurrency,
  setIsFiltered,
  setToCurrency
} from './redux';
import { useDebounce } from '@/shared/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { UiLoader } from '@/shared/ui/UiLoader';

//FIXME: remove inline styles
//TODO: fetch ony buy and only sell
const ExchangeForm = () => {

  const dispatch = useDispatch();
  // const [chosenCurrencyFrom, setChosenCurrencyFrom] = useState<ICurrency>(CurrenciesMock[0]);
  // const [chosenCurrencyTo, setChosenCurrencyTo] = useState<ICurrency>(CurrenciesMock[1]);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 10);

  const { isLoading, isError, data, isSuccess, isUninitialized } = useGetListOfAvailableCurrenciesQuery({});

  dispatch(setCurrencies(data!));


  // const currency = useSelector(getCurrenciesSelector);
  // if (!isError && !isLoading) {

  // setFromCurrency(currency[0]);
  // setToCurrency(currency[1]);

  // }
  //FIXME: add check

  const isFiltered = useSelector(getIsFilteredSelector);
  const filteredData = useSelector(getFilteredCurrenciesSelector);

  const fromCurrency = useSelector(getFromCurrencySelector);
  const toCurrency = useSelector(getToCurrencySelector);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
    if (e.target.value !== '') {
      dispatch(searchCurrency(debouncedValue));
      dispatch(setIsFiltered(true));
    } else {
      dispatch(setIsFiltered(false));
    }
  };

  const amountHandler = (e: ChangeEvent<HTMLInputElement>) => {

  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  };

  const getCurrencyFrom = (e: React.MouseEvent, value: ICurrency) => {
    dispatch(setFromCurrency(value));
    dispatch(setIsFiltered(false));
  };
  const getCurrencyTo = (e: React.MouseEvent, value: ICurrency) => {
    dispatch(setToCurrency(value));
    dispatch(setIsFiltered(false));
  };

  if (isLoading) return <UiLoader />;

  return (
    <form className={'exchange-form'}>
      <div className='flex exchange-form__top align-items-center' style={{ flexWrap: 'wrap' }}>

        <div className={'exchange-form__block'}>
          <SearchFormField
            searchHandler={searchHandler}
            searchValue={searchValue}
            amountHandler={amountHandler}
            onClick={getCurrencyFrom}
            currencies={isFiltered ? filteredData : data!}
            chosenCurrency={fromCurrency ? fromCurrency : data![0]}
          />
        </div>
        <img src={swap} alt='swap' className={'exchange-form__img'} />
        <div className={'exchange-form__block'}>
          <SearchFormField
            searchHandler={searchHandler}
            searchValue={searchValue}
            amountHandler={amountHandler}
            // onChange={onChange}
            onClick={getCurrencyTo}
            currencies={isFiltered ? filteredData : data!}
            chosenCurrency={toCurrency ? toCurrency : data![1]}
            // amountValue={"10"}
          />
        </div>
      </div>
      <div className='exchange-form__bottom'>
        <span className={'exchange-form__address'}>Your Ethereum address</span>
        <div className='flex' style={{ gap: 32, flexWrap: 'wrap' }}>
          <UiFormField className='flex-1' />
          <UiButton>Exchange</UiButton>
        </div>
      </div>
    </form>
  );
};

export default ExchangeForm;