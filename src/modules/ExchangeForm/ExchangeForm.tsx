import React, {useState} from 'react';
import {UiFormField, UiSearchDropdown} from "@/shared/ui";
import {ICurrency} from "@/models";
import {CurrenciesMock} from "@/mock/Currencies.mock";
import swap from '@/assets/icons/swap.svg'
import "./ExchangeForm.scss"

//FIXME: remove inline styles
const ExchangeForm = () => {
  const [chosenCurrencyFrom, setChosenCurrencyFrom] = useState<ICurrency>(CurrenciesMock[0])
  const [chosenCurrencyTo, setChosenCurrencyTo] = useState<ICurrency>(CurrenciesMock[1])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  const getCurrencyFrom = (e: React.MouseEvent, value: ICurrency) => {
    setChosenCurrencyFrom(value);
  }
  const getCurrencyTo = (e: React.MouseEvent, value: ICurrency) => {
    setChosenCurrencyTo(value);
  }

  return (
      <form className={"flex exchange-form align-items-center"}>
        <div className={"exchange-form__block"}>
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
        <img src={swap} alt="swap" className={"exchange-form__img"}/>
        <div className={"exchange-form__block"}>
          <UiFormField suffix={
            <UiSearchDropdown
                onChange={onChange}
                onClick={getCurrencyTo}
                currencies={CurrenciesMock}
                chosenCurrency={chosenCurrencyTo}/>}
          />
        </div>
      </form>
  );
};

export default ExchangeForm;