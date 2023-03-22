import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UiButton } from '@/shared/ui'
import '@styles/index.scss'
// import '@styles/index.scss'

const App = () => {
  return (
    <div className="App" style={{ fontSize: 40 }}>
      <UiButton disabled onClick={undefined}>Xui</UiButton>
    </div>
  )
}

export default App
