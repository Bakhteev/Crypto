import React, { type MouseEvent, useEffect, useState } from 'react'
import { type ICurrency } from '@/models'
import { UiFormField } from '../UiFormField'
import { UiSearchDropdownOption } from './UiSearchDropdownOption'
// @ts-expect-error ?? for docker
import arrow from '@/assets/icons/arrow.svg'
// @ts-expect-error ?? for docker
import close from '@/assets/icons/close.svg'
import './UiSearchDropdown.scss'

const UiSearchDropdown = ({
  onChange,
  currencies,
  chosenCurrency,
  onClick,
  value
}: UiSearchDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const clickOpenHandler = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
  }, [])
  const chooseOptionHandler = (value: ICurrency) => {
    return (e: MouseEvent) => {
      clickOpenHandler()
      onClick(e, value)
    }
  }

  return (
    <>
      <div
        onClick={clickOpenHandler}
        className={'flex align-items-center ui-search-dropdown-closed'}
      >
        {(chosenCurrency == null)
          ? (
            <span className={'ui-search-dropdown-closed__text'}>
            Choose currency
          </span>
            )
          : (
            <>
              <img
                src={chosenCurrency.image}
                alt={chosenCurrency.ticker}
                className={'ui-search-dropdown-closed__icon'}
              />
              <span className={'ui-search-dropdown-closed__name'}>
              {chosenCurrency.ticker}
            </span>
            </>
            )}
        <img src={arrow} alt='open' />
      </div>

      <div
        style={{ display: isOpen ? 'block' : 'none' }}
        className={'ui-search-dropdown-opened'}
      >
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
        <div
          onClick={clickOpenHandler}
          className={'ui-search-dropdown-opened__backdrop'}
        ></div>
        <div className={'ui-search-dropdown-opened__options-container'}>
          {(currencies.length === 0) && 'Nothing'}
          {currencies.map((currency, index) => (
            <UiSearchDropdownOption
              key={`${currency.name}${currency.ticker}${index}`}
              currency={currency}
              onClick={chooseOptionHandler}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export interface UiSearchDropdownProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  currencies: ICurrency[]
  chosenCurrency: ICurrency | null
  onClick: (e: MouseEvent, value: ICurrency) => void
  value: string
}

export default UiSearchDropdown
