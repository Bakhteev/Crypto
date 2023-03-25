import React, { MouseEvent, useRef, useState } from 'react';
import { ICurrency } from '@/models';
import { UiFormField } from '../UiFormField';
import { UiSearchDropdownOption } from './UiSearchDropdownOption';
import arrow from '@/assets/icons/arrow.svg';
import close from '@/assets/icons/close.svg';
import './UiSearchDropdown.scss';


const UiSearchDropdown = ({ onChange, currencies, chosenCurrency, onClick, value }: UiSearchDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const clickOpenHandler = () => setIsOpen((prev) => !prev);

  const chooseOptionHandler = (value: ICurrency) => {
    return (e: MouseEvent) => {
      clickOpenHandler();
      onClick(e, value);
    };
  };

  return (
    <>
      <div
        onClick={clickOpenHandler}
        className={'flex align-items-center ui-search-dropdown-closed'}
      >
        <img
          src={chosenCurrency.image}
          alt='icon'
          className={'ui-search-dropdown-closed__icon'}
        />
        <span className={'ui-search-dropdown-closed__name'}>
            {chosenCurrency.ticker}
          </span>
        <img src={arrow} alt='open' />
      </div>

      {isOpen && (
        <div ref={ref} className={'ui-search-dropdown-opened'}>
          <div>
            <UiFormField
              value={value}
              onChange={onChange}
              placeholder={'Search...'}
              className={'no-border-bottom-radius border-bottom'}
              suffix={
                <img
                  src={close}
                  onClick={clickOpenHandler}
                  className={'ui-search-dropdown-opened__close-icon'}
                  alt='&nbsp;'
                />
              }
            />

          </div>
          <div style={{ overflowY: 'auto', maxHeight: '250px' }}>
            {!currencies.length && 'Nothing'}
            {
              currencies.map((currency, index) =>
                <UiSearchDropdownOption
                  key={currency.name + currency.ticker + index}
                  currency={currency}
                  onClick={chooseOptionHandler}
                />
              )}
          </div>
        </div>
      )}
    </>
  );
};

export type UiSearchDropdownProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  currencies: ICurrency[]
  chosenCurrency: ICurrency
  onClick: (e: MouseEvent, value: ICurrency) => void,
  value: string
}

export default UiSearchDropdown;
