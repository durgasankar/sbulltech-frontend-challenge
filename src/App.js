import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/404' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
