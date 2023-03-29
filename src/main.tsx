import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
import { RouterProvider } from 'react-router-dom'
import { MainRouter } from '@/routes'
import '@/styles/index.scss'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={MainRouter} />
  </Provider>
)
