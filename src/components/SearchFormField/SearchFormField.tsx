import React from 'react'
import { UiFormField, UiSearchDropdown } from '@/shared/ui'
import { type ICurrency } from '@/models'
import { UiLoader } from '@/shared/ui/UiLoader'
import './SearchFormField.scss'

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
  disabled,
  lineThrough
}: SearchFormFieldProps): JSX.Element => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    if (amountHandler != null) {
      amountHandler(e, +value)
    }
    //   if (/^[\d,.]*$/.test(value)) {
    //     if (value.includes(',')) {
    //       value = value.replace(/,+/, '.')
    //     }
    // }
    // }
  }
  return (
    <UiFormField
      type={'number'}
      error={error}
      required
      className={lineThrough ? 'line-through position-relative' : ''}
      onChange={changeHandler}
      value={amountValue}
      disabled={disabled}
      step={'any'}
      pattern='[0-9]+([\.|,][0-9]+)?'
      // pattern='[0-9]+([\.,][0-9]+)?'
      suffix={
        <>
          {loading && loading
            ? (
              <UiLoader />
              )
            : (
              <UiSearchDropdown
                value={searchValue}
                chosenCurrency={chosenCurrency}
                currencies={currencies}
                onClick={onClick}
                onChange={searchHandler}
              />
              )}
        </>
      }
    />
  )
}

export interface SearchFormFieldProps {
  chosenCurrency: ICurrency | null
  currencies: ICurrency[]
  amountHandler?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => void
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void

  onClick: (e: React.MouseEvent, value: ICurrency) => void
  error?: boolean
  amountValue?: string
  searchValue: string

  loading?: boolean

  disabled?: boolean
  lineThrough?: boolean
}

export default SearchFormField
