import React, { type MouseEvent } from 'react'
import { type ICurrency } from '@/models'
import './UiSearchDropdownOption.scss'

const UiSearchDropdownOption = ({ currency, onClick }: UiSearchDropdownOptionProps) => {
  const { ticker, name, image } = currency
  return (
    <div
      onClick={onClick(currency)}
      className={'flex align-items-center ui-search-field-option'}
    >
      <img
        src={image}
        alt='icon'
        className={'ui-search-field-option__icon'}
      />
      <span className={'ui-search-field-option__ticker'}>
          {ticker}
        </span>
      <span className={'ui-search-field-option__name'}>
          {name}
        </span>
    </div>
  )
}

export interface UiSearchDropdownOptionProps {
  onClick: (value: ICurrency) => (e: MouseEvent) => void
  currency: ICurrency
}
export default UiSearchDropdownOption
