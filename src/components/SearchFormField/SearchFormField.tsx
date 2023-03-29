import React from 'react'
import { UiFormField, UiSearchDropdown } from '@/shared/ui'
import { type ICurrency } from '@/models'
import { UiLoader } from '@/shared/ui/UiLoader'

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
}: SearchFormFieldProps): JSX.Element => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value
    if (amountHandler != null) {
      if (/^[\d,.]*$/.test(value)) {
        if (value.includes(',')) {
          value = value.replace(/,+/, '.')
        }
        amountHandler(e, value)
      }
    }
  }
  return (
    <UiFormField
      type={'text'}
      error={error}
      required
      onChange={changeHandler}
      value={amountValue}
      disabled={disabled}
      pattern='[0-9]+([\.,][0-9]+)?'
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
    value: string
  ) => void
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void

  onClick: (e: React.MouseEvent, value: ICurrency) => void
  error?: boolean
  amountValue?: string
  searchValue: string

  loading?: boolean

  disabled?: boolean
}

export default SearchFormField
