import React from 'react';
import { UiFormField, UiSearchDropdown } from '@/shared/ui';
import { CurrenciesMock } from '@/mock/Currencies.mock';


const FormField = () => (
  <UiFormField
    type={'number'}
    suffix={
      <UiSearchDropdown
        chosenCurrency={CurrenciesMock[0]}
        currencies={CurrenciesMock}
        onChange={() => console.log('hello')}
        onClick={() => ''}
      />
    }
  />
);


export default FormField;