import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home/Home.page'
import Url from './routes/Url/Url.page'
import Header from './components/Header/Header.component';

import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <h1>
          Shortnr
        </h1>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/*" element={<Url />} />
        </Routes>
      </main>
    </>
  );
}

export default App;