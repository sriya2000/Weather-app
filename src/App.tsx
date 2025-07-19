import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CityWeather from './Pages/CityWeather';

const App: React.FC = () => (
 
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:cityName" element={<CityWeather />} />
    </Routes>
  </BrowserRouter>
)


export default App;