import React from 'react';
import ExchangeForm from '@/modules/ExchangeForm/ExchangeForm';

//TODO: styles for text
//TODO: common: add adaptive, refactor
// FIXME: remove inline styles
const MainPage = () => {
  return (
    <main className={'main'}>
      <div className='container'>
        <div>
          <h1>Crypto Exchange</h1>
          <h2>Exchange fast and easy</h2>
          <ExchangeForm />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
