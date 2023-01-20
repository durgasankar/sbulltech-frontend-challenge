import React, { Suspense, useEffect } from 'react';
import './App.scss';
import './utils/Interceptor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { history } from './utils/history';
import PageNotFound from './common/PageNotFound';
import StocksPage from './components/StocksPage';

function App() {
  useEffect(() => {
    history.push('/stocks');
  }, [])
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='heading-primary'>Loading...</div>}>
        <Routes history={history}>
          <Route path="/" element={<StocksPage />} exert />
          <Route path="/stocks" element={<StocksPage />} exert />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
