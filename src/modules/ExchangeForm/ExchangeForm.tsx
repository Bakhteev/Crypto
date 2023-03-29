import React, { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { type ICurrency } from '@/models'
import {
  useGetListOfAvailableCurrenciesQuery,
  useLazyGetEstimatedAmountQuery,
  useLazyGetMinAmountQuery
} from './api'
import './ExchangeForm.scss'
import { getFromCurrencySelector, getToCurrencySelector, setFromCurrency, setToCurrency } from './redux'
import { useAppDispatch, useAppSelector, useDebounce } from '@/shared/hooks'
import { UiButton, UiFormField } from '@/shared/ui'
import { SearchFormField } from '@/components'
// @ts-expect-error?? for docker
import swap from '@/assets/icons/swap.svg'
import { setIsLoading } from '@/store/slices/GlobalLoading.slice'
// TODO: 3 вечная загрука при нолике ??
// TODO: 5 баг с поиском ??
const ExchangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [searchValueToBuy, setSearchValueToBuy] = useState<string>('')
  const [searchValueToSell, setSearchValueToSell] = useState<string>('')

  const [currenciesToBuy, setCurrenciesToBuy] = useState<ICurrency[]>([])
  const [currenciesToSell, setCurrenciesToSell] = useState<ICurrency[]>([])

  const [toAmount, setToAmount] = useState<number | string>('')
  const [fromAmount, setFromAmount] = useState<number | string>('')
  const [address, setAddress] = useState('')
  const [validationError, setValidationError] = useState(false)
  const [validationErrorMessage, setValidationErrorMessage] = useState('')

  const debouncedSearchToBuy = useDebounce<string>(searchValueToBuy, 200)
  const debouncedSearchToSell = useDebounce<string>(searchValueToSell, 200)
  const debouncedFromAmount = useDebounce<number | string>(fromAmount, 500)

  const fromCurrency = useAppSelector(getFromCurrencySelector)
  const toCurrency = useAppSelector(getToCurrencySelector)

  const {
    isLoading: isLoadingToBuy,
    data: fetchedCurrenciesToBuy
  } = useGetListOfAvailableCurrenciesQuery({
    active: true,
    buy: true
  })
  const {
    isLoading: isLoadingToSell,
    data: fetchedCurrenciesToSell
  } = useGetListOfAvailableCurrenciesQuery({
    active: true,
    sell: true
  })

  const [getMinAmountQuery, { data: minAmount, isError: isMinAmountError }] =
    useLazyGetMinAmountQuery()

  const [getEstimatedAmountQuery, { data: estimated, isError: isEstimatedError }] =
    useLazyGetEstimatedAmountQuery()

  const filter = (value: string, arr: ICurrency[]): ICurrency[] => {
    const pattern = new RegExp(value.toLowerCase())
    return arr.filter(
      (item) =>
        pattern.test(item.name.toLowerCase()) ||
        pattern.test(item.ticker.toLowerCase())
    )
  }

  useEffect(() => {
    if (fetchedCurrenciesToSell != null) {
      setCurrenciesToSell(fetchedCurrenciesToSell)
    }
    if (fetchedCurrenciesToBuy != null) {
      setCurrenciesToBuy(fetchedCurrenciesToBuy)
    }
  }, [fetchedCurrenciesToSell, fetchedCurrenciesToBuy])

  useEffect(() => {
    if (debouncedSearchToBuy) {
      setCurrenciesToBuy(
        filter(debouncedSearchToBuy.toLowerCase(), currenciesToBuy)
      )
    } else {
      setCurrenciesToBuy(fetchedCurrenciesToBuy ?? [])
    }
    if (debouncedSearchToSell) {
      setCurrenciesToSell(
        filter(debouncedSearchToSell.toLowerCase(), currenciesToSell)
      )
    } else {
      setCurrenciesToSell(fetchedCurrenciesToSell ?? [])
    }
  }, [debouncedSearchToBuy, debouncedSearchToSell])

  useEffect(() => {
    if ((fromCurrency != null) && (toCurrency != null)) {
      getMinAmountQuery({
        fromCurrency: fromCurrency.ticker,
        toCurrency: toCurrency.ticker,
        toNetwork: toCurrency.network,
        fromNetwork: fromCurrency.network
      })
        .finally(() => dispatch(setIsLoading(false)))
      dispatch(setIsLoading(true))
    }
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (
      (fromCurrency != null) &&
      (toCurrency != null) &&
      (minAmount != null) &&
      +debouncedFromAmount >= minAmount.minAmount
    ) {
      dispatch(setIsLoading(true))
      getEstimatedAmountQuery({
        fromCurrency: fromCurrency.ticker,
        toCurrency: toCurrency.ticker,
        toNetwork: toCurrency.network,
        fromNetwork: fromCurrency.network,
        fromAmount: debouncedFromAmount,
        toAmount: ''
      })
        .finally(() => dispatch(setIsLoading(false)))
    }
  }, [debouncedFromAmount])

  useEffect(() => {
    if ((minAmount != null) && !isMinAmountError && fromCurrency && toCurrency) {
      setFromAmount(minAmount.minAmount)
      if (validationError) setValidationError(false)
      getEstimatedAmountQuery({
        fromCurrency: fromCurrency.ticker,
        toCurrency: toCurrency.ticker,
        toNetwork: toCurrency.network,
        fromNetwork: fromCurrency.network,
        fromAmount: minAmount.minAmount,
        toAmount: ''
      })
        .finally(() => dispatch(setIsLoading(false)))
      dispatch(setIsLoading(true))
    } else {
      dispatch(setIsLoading(false))
    }
  }, [minAmount, isMinAmountError])

  useEffect(() => {
    if ((estimated != null) && !isEstimatedError) {
      setToAmount(estimated.toAmount)
      setFromAmount(estimated.fromAmount)
      dispatch(setIsLoading(false))
    } else {
      dispatch(setIsLoading(false))
    }
  }, [estimated, isEstimatedError])

  const amountHandlerFrom = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setFromAmount(value)
    setValidationError(false)
    if (minAmount && estimated && !Number.isNaN(+value)) {
      if (+value < minAmount.minAmount) {
        setToAmount('-----------')
        setValidationErrorMessage(`Minimal price is ${minAmount.minAmount}`)
        setValidationError(true)
        if (+value <= 0) {
          setValidationError(true)
          setValidationErrorMessage('Price can not be 0')
        }
      } else {
        setToAmount(estimated.toAmount)
        setValidationError(false)
      }
    } else {
      setValidationError(true)
      setValidationErrorMessage(!minAmount ? 'Choose currency' : 'Wrong price format')
    }
  }

  const getCurrencyFrom = (e: React.MouseEvent, value: ICurrency) => {
    dispatch(setFromCurrency(value))
    setSearchValueToBuy('')
  }
  const getCurrencyTo = (e: React.MouseEvent, value: ICurrency) => {
    dispatch(setToCurrency(value))
    setSearchValueToSell('')
  }

  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    alert('Successfully exchanged')
  }

  return (
    <form onSubmit={onSubmit} className={'exchange-form'}>
      <div className='exchange-form__top'>
        <div className={'exchange-form__block'}>
          <SearchFormField
            searchHandler={(e) => {
              setSearchValueToBuy(e.target.value.trim())
            }}
            searchValue={searchValueToBuy}
            amountHandler={amountHandlerFrom}
            onClick={getCurrencyFrom}
            currencies={currenciesToBuy}
            chosenCurrency={fromCurrency}
            amountValue={fromAmount?.toString() || ''}
            loading={isLoadingToBuy}
            error={validationError}
          />
        </div>
        <img src={swap} alt='swap' className={'exchange-form__img'} />
        <div className={'exchange-form__block'}>
          <SearchFormField
            searchHandler={(e) => {
              setSearchValueToSell(e.target.value.trim())
            }}
            searchValue={searchValueToSell}
            onClick={getCurrencyTo}
            currencies={currenciesToSell}
            chosenCurrency={toCurrency}
            loading={isLoadingToSell}
            amountValue={toAmount?.toString() || ''}
            disabled={true}
          />
        </div>
      </div>
      <div className='exchange-form__bottom'>
        <span className={'exchange-form__address'}>Your Ethereum address</span>
        <div className='flex'>
          <UiFormField
            className='flex-1'
            onChange={handleAddress}
            value={address}
            required
          />
          <UiButton
            disabled={
              (isLoadingToSell && isLoadingToBuy) ||
              isEstimatedError ||
              isMinAmountError ||
              validationError
            }
            error={isEstimatedError || isMinAmountError || validationError}
            errorMessage={validationError ? validationErrorMessage : ''}
          >
            Exchange
          </UiButton>
        </div>
      </div>
    </form>
  )
}

export default ExchangeForm
