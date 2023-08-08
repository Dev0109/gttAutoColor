import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home';
import GetColor from './components/GetColor';
import Footer from './components/Footer';
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="gttautopaint" element={<GetColor />}/>
        <Route path="products" element={<Products />}/>
      </Routes>
      {/* <Footer />s */}
    </div>
  );
}

export default App;