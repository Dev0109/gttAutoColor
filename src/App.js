import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import GetColor from './components/GetColor';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="gttautopaint" element={<GetColor />}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;