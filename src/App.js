import React, { Suspense } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import StocksPage from './components/StocksPage';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Suspense fallback={<div className='heading-primary'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<StocksPage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
