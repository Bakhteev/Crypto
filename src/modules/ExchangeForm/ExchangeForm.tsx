import React, {useState} from 'react';
import {UiFormField, UiSearchField} from "@/shared/ui";
import {ICurrency} from "@/models";
import {CurrenciesMock} from "@/mock/Currencies.mock";
import swap from '@/assets/icons/swap.svg'


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
      <form className={"flex"}>
          <div style={{position: "relative",  flex: 1}}>
            <UiFormField
                suffix={
                  <UiSearchField
                      onChange={onChange}
                      onClick={getCurrencyFrom}
                      currencies={CurrenciesMock}
                      chosenCurrency={chosenCurrencyFrom}
                  />
                }
            />
          </div>
          <img src={swap} alt="" style={{margin: "0 28px"}}/>
          <div style={{position: "relative", flex: 1}}>
            <UiFormField suffix={
              <UiSearchField
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