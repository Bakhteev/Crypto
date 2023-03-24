import React from 'react';
import { UiFormField, UiSearchDropdown } from '@/shared/ui';
import { ICurrency } from '@/models';


const SearchFormField = ({
                           chosenCurrency,
                           currencies,
                           amountHandler,
                           searchHandler,
                           onClick,
                           error,
                           amountValue,
                           searchValue
                         }: SearchFormFieldProps) => (
  <UiFormField
    type={'number'}
    error={error}
    onChange={amountHandler}
    value={amountValue}
    suffix={
      <UiSearchDropdown
        value={searchValue}
        chosenCurrency={chosenCurrency}
        currencies={currencies}
        onClick={onClick}
        onChange={searchHandler}
      />
    }
  />
);

export interface SearchFormFieldProps {
  chosenCurrency: ICurrency,
  currencies: ICurrency[],
  amountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,

  onClick: (e: React.MouseEvent, value: ICurrency) => void,
  error?: boolean,
  amountValue?: string;
  searchValue: string;
}


export default SearchFormField;