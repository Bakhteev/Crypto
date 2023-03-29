import React from 'react'
import ExchangeForm from '@/modules/ExchangeForm/ExchangeForm'
import { useAppSelector } from '@/shared/hooks'
import { UiLoader } from '@/shared/ui/UiLoader'
import './MainPage.scss'

const MainPage = () => {
  const isLoading = useAppSelector(state => state.GlobalLoading.isLoading)
  return (
    <main className={'main'}>
      {
        isLoading &&
        <div
          className={'flex align-items-center justify-content-center main__loader-backdrop'}
        >
          <UiLoader />
        </div>
      }
      {
        <div className={'flex-1'}>
          <h1 className={'main__title'}>Crypto Exchange</h1>
          <h2 className={'main__sub-title'}>Exchange fast and easy</h2>
          <ExchangeForm />
        </div>
      }
    </main>
  )
}

export default MainPage
