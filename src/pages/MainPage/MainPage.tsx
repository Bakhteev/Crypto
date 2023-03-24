import React from 'react';
import ExchangeForm from '@/modules/ExchangeForm/ExchangeForm';

const MainPage = () => {
  return (
    <main className={'main'}>
      <div className='container'>
        <div>
          <h1>Crypto Exchange</h1>
          <h2>Exchange fast and easy</h2>
        </div>
        <ExchangeForm />
      </div>
    </main>
  );
};

export default MainPage;
