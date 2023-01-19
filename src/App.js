import React, { Suspense, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { history } from './utils/history';
import PageNotFound from './common/PageNotFound';
import StocksPage from './components/StocksPage';

function App() {
  useEffect(() => {
    history.push('/stocks')
  }, [])
  return (
    <div >
      <BrowserRouter>
        <Suspense fallback={<div className='heading-primary'>Loading...</div>}>
          <Routes history={history}>
            <Route path="/" element={<StocksPage />} />
            <Route path="/stocks" element={<StocksPage />} exert />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
