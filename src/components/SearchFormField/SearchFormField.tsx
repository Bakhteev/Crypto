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
                           loading,
                           disabled
                         }: SearchFormFieldProps) => {

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(/[^\d.]/g);
    const value = e.target.value.replace(pattern, '');
    if (amountHandler) {
      amountHandler(e, +value);
    }
  };
  return (
    <UiFormField
      type={'text'}
      error={error}
      onChange={changeHandler}
      value={amountValue}
      disabled={disabled}
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
};

export interface SearchFormFieldProps {
  chosenCurrency: ICurrency,
  currencies: ICurrency[],
  amountHandler?: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void,
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,

  onClick: (e: React.MouseEvent, value: ICurrency) => void,
  error?: boolean,
  amountValue?: string;
  searchValue: string;

  loading?: boolean

  disabled?: boolean
}


export default SearchFormField;