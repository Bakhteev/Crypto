import React, { useState } from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import SearchFormField from './SearchFormField';
import { type ICurrency } from '@/models';
import { CurrenciesMock } from '@/mock/Currencies.mock';
import { useDebounce } from '@/shared/hooks';
import { MinimalExchangeAmountMock } from '@/mock/MinAmount.mock';

export default {
  title: 'components/SearchFormField',
  component: SearchFormField,
  argTypes: {}
} as ComponentMeta<typeof SearchFormField>;

const Template: ComponentStory<typeof SearchFormField> = (args) => {
  const [chosenCurrency, setChosenCurrency] = useState<ICurrency>(
    CurrenciesMock[0]
  );
  const [filteredCurrencies, setFilteredCurrencies] = useState<ICurrency[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [amountValue, setAmountValue] = useState<number | string>('');
  const getAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number
  ): void => {
    // const value = e.target.value;
    setAmountValue(value);
    setIsError(+amountValue <= 0 && amountValue !== '');
  };

  const debouncedValue = useDebounce<string>(searchValue, 10);
  const getSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value.trim());
    if (e.target.value !== '') {
      const pattern = new RegExp(debouncedValue.toLowerCase());
      setFilteredCurrencies(
        [CurrenciesMock[2]].filter(
          (item) =>
            pattern.test(item.name.toLowerCase()) ||
            pattern.test(item.ticker.toLowerCase())
        )
      );
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  };

  const onClick = (e: React.MouseEvent, value: ICurrency): void => {
    setChosenCurrency(value);
    setAmountValue(MinimalExchangeAmountMock.minAmount);
  };

  return (
    <SearchFormField
      onClick={onClick}
      amountHandler={getAmount}
      searchHandler={getSearch}
      chosenCurrency={chosenCurrency}
      currencies={isFiltered ? filteredCurrencies : [CurrenciesMock[2]]}
      error={isError}
      amountValue={amountValue.toString()}
      searchValue={searchValue}
    />
  );
};

export const Default = Template.bind({});
