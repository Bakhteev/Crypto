import React, { useState } from 'react';
import { UiButton, UiFormField, UiSearchDropdown } from '@/shared/ui';
import { ICurrency } from '@/models';
import { CurrenciesMock } from '@/mock/Currencies.mock';
import swap from '@/assets/icons/swap.svg';
import './ExchangeForm.scss';

//FIXME: remove inline styles
const ExchangeForm = () => {
  const [chosenCurrencyFrom, setChosenCurrencyFrom] = useState<ICurrency>(CurrenciesMock[0]);
  const [chosenCurrencyTo, setChosenCurrencyTo] = useState<ICurrency>(CurrenciesMock[1]);

  // const {isLoading, isError, data} = useGetCurrenciesQuery("");
  // const {isLoading, isError, data} = useGetMinAmountQuery({
  //   fromCurrency: "btc",
  //   toCurrency: "usdt",
  //   fromNetwork: "btc",
  //   toNetwork: "eth"
  // });
  // console.log(data)
  //
  // }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  };

  const getCurrencyFrom = (e: React.MouseEvent, value: ICurrency) => {
    setChosenCurrencyFrom(value);
  };
  const getCurrencyTo = (e: React.MouseEvent, value: ICurrency) => {
    setChosenCurrencyTo(value);
  };

  return (
    <form className={'exchange-form'}>
      <div className='flex exchange-form__top align-items-center' style={{ flexWrap: 'wrap' }}>

        <div className={'exchange-form__block'}>
          <UiFormField
            suffix={
              <UiSearchDropdown
                onChange={onChange}
                onClick={getCurrencyFrom}
                currencies={CurrenciesMock}
                chosenCurrency={chosenCurrencyFrom}
              />
            }
          />
        </div>
        <img src={swap} alt='swap' className={'exchange-form__img'} />
        <div className={'exchange-form__block'}>
          <UiFormField suffix={
            <UiSearchDropdown
              onChange={onChange}
              onClick={getCurrencyTo}
              currencies={CurrenciesMock}
              chosenCurrency={chosenCurrencyTo} />}
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