import React from 'react';
import { UiFormField, UiSearchDropdown } from '@/shared/ui';
import { ICurrency } from '@/models';
import { UiLoader } from '@/shared/ui/UiLoader';


const SearchFormField = ({
                           chosenCurrency,
                           currencies,
                           amountHandler,
                           searchHandler,
                           onClick,
                           error,
                           amountValue,
                           searchValue,
                           loading
                         }: SearchFormFieldProps) => (
  <UiFormField
    type={'number'}
    error={error}
    onChange={amountHandler}
    value={amountValue}
    suffix={
      <>
        {
          loading ? <UiLoader /> :
            <UiSearchDropdown
              value={searchValue}
              chosenCurrency={chosenCurrency}
              currencies={currencies}
              onClick={onClick}
              onChange={searchHandler}
            />
        }
      </>
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

  loading?: boolean
}


export default SearchFormField;